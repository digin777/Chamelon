export function RandomSelect<T>(collection:Array<T>):T{
    return collection[Math.floor(Math.random() * collection.length)]
}
export class Utlity{
    constructor(){}
    /**
     * getSection
     */
    public static getSection():string {
        let section: any = window.location.pathname.toString().split('/');
        section = section[2];
        return section as string;
    }
}