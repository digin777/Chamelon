import axios, { AxiosInstance, Axios } from 'axios';
export class BaseApi {
    private static Instance: BaseApi;
    private axios: Axios;
    constructor(config: any = {}) {
        this.axios = axios.create({
            baseURL: `${'http://localhost:3002/admin'}`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        });
    }

    static getInsance() {
        if (!BaseApi.Instance) {
            BaseApi.Instance = new BaseApi();
        }
        return BaseApi.Instance;
    }

    getsectionData(section: string, id?: string) {
        return this.axios
            .post(`/${section}/sectionDataById`, {
                section: section,
                id: id
            });
    }

    getsectionConfig(section?: string) {
        return this.axios
            .post('/getSectionConfig', {
                section: section
            })
    }

    getOptions(route?:string,data:any={}){
        return this.axios
            .post(`/customRoutes/${route}`,data)
    }
    addsectionData(section: string, sectiondata: any) {
        let config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
          }
        return this.axios
            .post(`/${section}/add`, 
                {
                    section,
                    data:sectiondata
                }
            // {
            //     headers: {
            //       'Content-Type': 'multipart/form-data'
            //     }
            //   }
              );
    }
    updatesectionData(section:string,sectiondata:any,recordId?:string,){
        let config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
          };
          return this.axios
            .post(`/${section}/update`, 
                {
                    section,
                    data:sectiondata,
                    recordId
                }
            );
    }
    getsectionDataList(section:string,page?:number,limit?:number,sort?:any){
        return this.axios
        .post(`/${section}`, 
            {
                section,
                page,
                limit
            }
        );
    }
    getSectionIndexConfig(section:string){
        return this.axios
        .post('/getColumnConfig',
        {
            section
        });
    }

    getSectionSort(section:string,sortinfo:any,pagination:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.axios
            .post(`/${section}/sectionSort`,{
                section,
                sort:sortinfo,
                pagination
            }).then(result=>{
                const {data} = result;
               resolve(data);
            }).catch(err=>{
                reject(err); 
            });
        });
    }
    Search(section:string,sortinfo:any,pagination:any,text:String):Promise<any>{
        pagination.page-=1;
        return new Promise((resolve,reject)=>{
            this.axios
                .post(`/${section}/search`,{
                    section,
                    sort:sortinfo,
                    search:{text},
                    pagination
                }).then(result=>{
                const {data} = result;
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
}