import { test, expect } from '@playwright/test';

/**
 * UC-08: Phân tích ảnh bữa ăn bằng AI
 * FR_8.2: Giao tiếp Gemini AI và bóc tách dữ liệu
 * Phương pháp: Bảng quyết định kết hợp phân hoạch tương đương
 */
test.describe('UC-08: Phân tích ảnh bữa ăn bằng AI', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Đăng nhập bằng tài khoản admin theo yêu cầu
    await page.fill('input[type="email"]', 'admin@gmail.com');
    await page.fill('input[type="password"]', '123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Đợi UI chuyển sang Dashboard có nút Add Meal
    await expect(page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' })).toBeVisible({ timeout: 10000 });
  });

  /**
   * TC_BB_8.2.1 — Kiểm tra phân tích ảnh có thực phẩm hợp lệ
   * Input: Ảnh chụp cơm, thịt, rau
   * Expected: AI trả về đủ 6 trường dữ liệu, hiển thị thông tin dinh dưỡng thành công
   */
  test('TC_BB_8.2.1 — Nhận diện có đồ ăn → Hiển thị đầy đủ thông tin dinh dưỡng', async ({ page }) => {
    // 1. Arrange
    const responseData = {
      isFood: true,
      foodItems: ['Cơm', 'Thịt', 'Rau'],
      calories: 500,
      protein: 30,
      carbs: 40,
      fats: 15,
      imageUrl: 'http://example.com/image.jpg',
      healthScore: 8
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');

    // 2. Act
    // Fake upload file bằng cách set file vào thẻ input type="file"
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // 3. Assert
    await expect(page.getByRole('heading', { name: 'Meal Detected' })).toBeVisible();
    await expect(page.getByText('Cơm')).toBeVisible();
    await expect(page.getByText('Calories: 500 cal')).toBeVisible();
    await expect(page.getByText('Protein: 30 g')).toBeVisible();
    await expect(page.getByText('Carbs: 40 g')).toBeVisible();
    await expect(page.getByText('Fats: 15 g')).toBeVisible();
  });

  /**
   * TC_BB_8.2.2 — Kiểm tra phân tích ảnh không có thực phẩm
   * Input: Ảnh chụp cái bàn trống
   * Expected: AI trả về isFood=false, hiển thị "No food detected"
   */
  test('TC_BB_8.2.2 — Nhận diện không có đồ ăn (isFood=false) → Báo lỗi "No food detected"', async ({ page }) => {
    // 1. Arrange
    const responseData = {
      isFood: false
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');

    // Bắt sự kiện dialog (alert) vì App.tsx đang dùng alert thay vì render UI modal
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // 2. Act
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'table.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // 3. Assert
    // Đợi alert xuất hiện bằng cách dùng toPass() thay vì waitForTimeout (bị cấm)
    await expect(async () => {
      expect(alertMessage).toContain('No food detected');
    }).toPass({ timeout: 5000 });
  });

  /**
   * TC_BB_8.2.3 — Kiểm tra xử lý khi AI response thiếu trường calories
   * Input: JSON trả về không có field calories
   * Expected: Hệ thống tự động gán calories = 0
   */
  test('TC_BB_8.2.3 — Thiếu trường calories → Gán giá trị mặc định 0', async ({ page }) => {
    // 1. Arrange
    const responseData = {
      isFood: true,
      foodItems: ['Cơm'],
      // Missing calories
      protein: 10,
      carbs: 20,
      fats: 5,
      imageUrl: 'http://example.com/image.jpg'
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');

    // 2. Act
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // 3. Assert
    // The implementation might default undefined to empty space instead of 0 if backend doesn't handle it.
    // ⚠️ LỆCH BÁO CÁO: Backend/Frontend có thể chưa xử lý vụ gán calories = 0, nhưng ta test expected
    await expect(page.getByRole('heading', { name: 'Meal Detected' })).toBeVisible();
    await expect(page.getByText('Calories: 0 cal')).toBeVisible();
  });

  /**
   * TC_BB_8.2.8 — Kiểm tra xử lý khi AI response thiếu nhiều trường cùng lúc
   * Input: JSON trả về chỉ có isFood=true
   * Expected: Hệ thống tự động gán giá trị mặc định cho tất cả (0 hoặc rỗng)
   */
  test('TC_BB_8.2.8 — Thiếu toàn bộ trường dinh dưỡng → Gán giá trị mặc định cho tất cả', async ({ page }) => {
    // 1. Arrange
    const responseData = {
      isFood: true
      // Missing foodItems, calories, protein, carbs, fats
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');

    // 2. Act
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // 3. Assert
    await expect(page.getByRole('heading', { name: 'Meal Detected' })).toBeVisible();
    await expect(page.getByText('Calories: 0 cal')).toBeVisible();
    await expect(page.getByText('Protein: 0 g')).toBeVisible();
    await expect(page.getByText('Carbs: 0 g')).toBeVisible();
    await expect(page.getByText('Fats: 0 g')).toBeVisible();
  });
  /**
   * TC_BB_8.1.1 — Kiểm tra upload ảnh định dạng không hợp lệ
   * Input: Ảnh meal.pdf, dung lượng 5MB
   * Expected: Hệ thống từ chối, hiển thị thông báo "Định dạng không hỗ trợ. Vui lòng chọn JPG, PNG hoặc WebP"
   */
  test('TC_BB_8.1.1 — File không đúng định dạng (.pdf) → Báo lỗi định dạng', async ({ page }) => {
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('fake-pdf-content')
    });

    // ⚠️ LỆCH BÁO CÁO: Frontend hiện tại chưa có logic validate định dạng ảnh. 
    // Test này sẽ fail cho đến khi dev implement FR_8.1.
    await expect(async () => {
      expect(alertMessage).toContain('Định dạng không hỗ trợ');
    }).toPass({ timeout: 5000 });
  });

  /**
   * TC_BB_8.1.2 — Kiểm tra upload ảnh dung lượng vượt quá 10MB
   * Input: Ảnh meal.jpg, dung lượng 15MB
   * Expected: Hệ thống từ chối, hiển thị thông báo "Dung lượng ảnh tối đa 10MB"
   */
  test('TC_BB_8.1.2 — File vượt dung lượng (>10MB) → Báo lỗi dung lượng', async ({ page }) => {
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.alloc(15 * 1024 * 1024) // 15MB
    });

    // ⚠️ LỆCH BÁO CÁO: Frontend hiện tại chưa có logic validate dung lượng ảnh. 
    await expect(async () => {
      expect(alertMessage).toContain('Dung lượng ảnh tối đa 10MB');
    }).toPass({ timeout: 5000 });
  });

  /**
   * TC_BB_8.3.1 — Kiểm tra lưu ảnh khi isFood=true
   * Input: isFood=true, ảnh JPG 5MB
   * Expected: Hệ thống trả về imageUrl, hiển thị ảnh kèm dinh dưỡng
   */
  test('TC_BB_8.3.1 — Xác nhận lưu ảnh (isFood=true) → Trả về imageUrl và hiển thị ảnh', async ({ page }) => {
    const responseData = {
      isFood: true,
      foodItems: ['Bánh mì'],
      calories: 300,
      protein: 10,
      carbs: 40,
      fats: 5,
      imageUrl: 'https://example.com/uploaded-image.jpg'
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'meal.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // Ảnh phải được render trong thẻ img.meal-image
    await expect(page.locator('img.meal-image')).toBeVisible();
    await expect(page.locator('img.meal-image')).toHaveAttribute('src', 'https://example.com/uploaded-image.jpg');
  });

  /**
   * TC_BB_8.3.2 — Kiểm tra không lưu ảnh khi isFood=false
   * Input: isFood=false
   * Expected: Hệ thống không trả về imageUrl, chỉ hiển thị "No food detected"
   */
  test('TC_BB_8.3.2 — Từ chối lưu ảnh (isFood=false) → Chỉ báo lỗi, không hiển thị Modal ảnh', async ({ page }) => {
    const responseData = {
      isFood: false
    };

    await page.route('**/api/meals/analyze', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    }));

    const responsePromise = page.waitForResponse('**/api/meals/analyze');

    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '📸 Take Photo & Analyze Meal' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'table.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content')
    });
    await responsePromise;

    // Bắt buộc alert lỗi phải xuất hiện
    await expect(async () => {
      expect(alertMessage).toContain('No food detected');
    }).toPass({ timeout: 5000 });

    // Đảm bảo modal hiển thị ảnh không được render
    await expect(page.locator('img.meal-image')).not.toBeVisible();
  });
});
