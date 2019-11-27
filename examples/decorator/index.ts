import "reflect-metadata";
import { Control } from "../../decorator/control";
import { Get, Put, Post } from "../../decorator/httpVerbs";
import { Module } from "../../decorator/module";
import { Middleware } from "../../decorator/middleware";
import {
  Req,
  Res,
  Next,
  Query,
  Param,
  Body
} from "../../decorator/routeParams";
import { Inject, Injectable } from "../../decorator/inject";
import createApplication from "../../decorator/createApplication";

const testMiddle = (req, res, next) => {
  console.log("testMiddle");
  next();
};

@Control("/test")
@Middleware(testMiddle)
class AppControl {
  private serivce;

  constructor(a, b) {
    console.log(a, b);
  }

  @Get("/entry1")
  async entry1(@Req req, @Res res, @Next next) {
    console.log(req, res, next);
  }

  @Put("/entry2/:id")
  entry2(@Query("id") a, @Param() b, @Body c, @Req req, @Res res) {
    res.test1(111);
    res.send("11");
    return 222;
  }
}

@Control("/demo")
class DemoControl {
  private serivce = "service";

  @Inject("Base")
  private test;

  constructor(private aService, private bService) {}

  @Get("/sendFile")
  async sendFile(@Res res) {
    res.sendFile(
      "/Users/weidonghua/Code/clinkz/output/c88f75c0-10ed-11ea-bc9f-a9f1b141a343.md",
      {
        headers: {
          "Content-Disposition":
            'attachment; filename="c88f75c0-10ed-11ea-bc9f-a9f1b141a343.md"'
        }
      }
    );
    return false;
  }

  @Get("/entry1")
  async entry1(@Res res, @Req req, @Next next) {
    console.log(this);
    console.log(req, res, next);
  }

  @Post("/demo/:id/:idx")
  entry2(@Query() a, @Param() b, @Body c): Date {
    console.log(this);
    this.aService.app();
    return new Date();
  }
}

class AppService {
  @Inject("Base")
  private target;

  app() {
    this.target.base();
    console.log("app");
  }
}

@Injectable("Base")
class BaseService {
  private target = "base-service";

  base() {
    console.log("base");
  }
}

@Module({
  controls: [AppControl, DemoControl],
  services: [AppService, BaseService]
})
class AppModule {}

const app = createApplication([AppModule]);

app.listen(3000);
console.log("Express started on port 3000");
