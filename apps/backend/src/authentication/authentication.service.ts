import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CustomerInsert, customers } from 'src/drizzle/models/customer.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzleService: DrizzleService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async registerCustomerWithEmailAndPassword(customer: CustomerInsert) {
    const hashedPassword = await this.hashPassword(customer.password);
    const newCustomer = await this.drizzleService
      .getDb()
      .insert(customers)
      .values({
        ...customer,
        password: hashedPassword,
      });
    return newCustomer;
  }

  async loginCustomerWithEmailAndPassword(email: string, password: string) {
    const customer = await this.drizzleService
      .getDb()
      .query.customers.findFirst({
        where: (customers, { eq }) => eq(customers.email, email),
      });
    if (!customer) {
      Logger.warn('Customer not found', { email });
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await this.compareHash(password, customer.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return customer;
  }

  public createAuthToken(customerId: string) {
    return this.jwtService.sign({
      customerId,
    });
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async compareHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
