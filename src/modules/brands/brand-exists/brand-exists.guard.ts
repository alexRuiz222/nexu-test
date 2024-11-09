import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
@Injectable()
export class BrandExistsGuard implements CanActivate {
  constructor(private brandService: BrandsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const brandId = request.params.id;

    const brand = await this.brandService.findOne(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return true;
  }
}
