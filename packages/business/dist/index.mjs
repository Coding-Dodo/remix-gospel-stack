var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/container.ts
import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { prisma } from "database";

// src/repositories/user-repository.ts
import { autoInjectable, inject } from "tsyringe";
var PrismaUserRepository = class {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async getUsers() {
    return this.prisma.user.findMany();
  }
};
PrismaUserRepository = __decorateClass([
  autoInjectable(),
  __decorateParam(0, inject("PrismaClient"))
], PrismaUserRepository);

// src/container.ts
container.register("PrismaClient", {
  useValue: prisma
});
container.register("UserRepository", { useClass: PrismaUserRepository }, { lifecycle: Lifecycle.Singleton });

// src/index.ts
var Service = {
  userRepository: container.resolve("UserRepository")
};
export {
  Service
};
//# sourceMappingURL=index.mjs.map