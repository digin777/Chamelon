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
    
}