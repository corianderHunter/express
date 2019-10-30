import 'reflect-metadata';
import { Control } from './control';
import { Get, Put, Post } from './httpVerbs';
import Module from './module';
import { Req, Res, Next, Query, Param, Body } from './routeParams';

import { createApplication } from './createApplication';

@Control('/test')
class AppControl {
  private serivce;

  constructor(a, b) {
    console.log(a, b);
  }

  @Get('/entry1')
  async entry1(@Req req, @Res res, @Next next) {
    console.log(req, res, next);
  }

  @Put('/entry2/:id')
  entry2(@Query('id') a, @Param() b, @Body c) {
    return new Date();
  }
}

@Control('/demo')
class DemoControl {
  private serivce;

  constructor(a, b) {
    console.log(a, b);
  }

  @Get('/entry1')
  async entry1(@Req req, @Res res, @Next next) {
    console.log(req, res, next);
  }

  @Post('/demo/:id/:idx')
  entry2(@Query() a, @Param() b, @Body c) {
    console.log(a, b, c);
    return new Date();
  }
}

class AppService {
  private targer = 'app-service';
  constructor() {}
}

class BaseService {
  private target = 'base-service';
  constructor() {}
}

@Module({
  controls: [AppControl, DemoControl],
  providers: [AppService, BaseService]
})
class AppModule {}

const app = createApplication([AppModule]);

app.listen(3000);
console.log('Express started on port 3000');
