import { Control } from './control';
import { Get, Put } from './httpVerbs';
import Module from './module';
import { Req, Res, Next, Query, Param, Body } from './routeParams';

@Control('test')
class App {
  private serivce;

  constructor(a, b) {
    console.log(a, b);
  }

  @Get('/entry1')
  async entry1(@Req req, @Res res, @Next next) {
    console.log(req, res, next);
  }

  @Put('/entry2/:id')
  entry2(@Query a, @Param b, @Body c) {
    console.log(a, b, c);
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
  controls: [App],
  providers: [AppService, BaseService]
})
class AppModule {}
