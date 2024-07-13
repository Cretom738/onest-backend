import { Reflector } from "@nestjs/core";
import { ERole } from "@prisma/client";

export const Roles = Reflector.createDecorator<ERole[]>();