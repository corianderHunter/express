import 'reflect-metadata';
import { Control } from './control';
import { Get, Put, Post } from './httpVerbs';
import Module from './module';
import { Req, Res, Next, Query, Param, Body } from './routeParams';
import { Inject } from './inject';
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
  private serivce = 'service';

  constructor(private aService, private bService) {}

  @Get('/entry1')
  async entry1(@Req req, @Res res, @Next next) {
    console.log(this);
    console.log(req, res, next);
  }

  @Post('/demo/:id/:idx')
  entry2(@Query() a, @Param() b, @Body c): Date {
    console.log(this);
    console.log(a, b, c);
    return new Date();
  }
}

class AppService {
  @Inject('target')
  private target = 'app-service';

  @Inject('a')
  a = 111;

  @Inject('c')
  static c;

  app() {
    console.log('app');
  }
}

class BaseService {
  private target = 'base-service';

  base() {
    console.log('base');
  }
}

@Module({
  controls: [AppControl, DemoControl],
  services: [AppService, BaseService]
})
class AppModule {}

const app = createApplication([AppModule]);

app.listen(3000);
console.log('Express started on port 3000');
