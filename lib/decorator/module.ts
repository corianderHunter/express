interface ModuleParams {
  imports?: any[];
  controls: any[];
  providers?: any[];
}

const Module = ({
  imports = [],
  controls = [],
  providers = []
}: ModuleParams): ClassDecorator => (...args) => {
  console.log(args);
};

export default Module;
