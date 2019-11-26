interface ModuleParams {
    imports?: any[];
    controls: any[];
    services?: any[];
}
declare const Module: ({ imports, controls, services }: ModuleParams) => ClassDecorator;
export default Module;
