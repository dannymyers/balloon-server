interface IService{    
    start() : void;
    stop() : void;
}

export default class BaseService implements IService {

    private intervalHandle: NodeJS.Timer;

    start = () => {
        this.intervalHandle = setInterval(this.run, 1000);
    }

    stop = () => {
        clearInterval(this.intervalHandle);
    }

    protected run = () =>{
        console.log("You must implement run!");
    }

    public kill = ()=>{}

}