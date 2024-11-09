import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelsService } from '../services/models.service';

@Injectable()
export class ModelExistsGuard implements CanActivate {
  constructor(private modelService: ModelsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const modelId = request.params.id;

    const model = await this.modelService.findOne(modelId);
    if (!model) {
      throw new NotFoundException('model not found');
    }
    return true;
  }
}
