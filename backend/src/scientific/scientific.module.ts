import { Module, Global } from '@nestjs/common';
import { ScientificService } from './scientific.service';

@Global()
@Module({
  providers: [ScientificService],
  exports: [ScientificService],
})
export class ScientificModule {}
