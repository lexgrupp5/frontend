//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * @param searchText (optional) 
     * @param endDate (optional) 
     * @param startDate (optional) 
     * @return Success
     */
    courses(searchText?: string | undefined, endDate?: Date | undefined, startDate?: Date | undefined): Promise<CourseDto[]>;
    /**
     * @return Success
     */
    getCourse(id: number): Promise<CourseDto>;
    /**
     * @return Success
     */
    modulesOfCourse(id: number): Promise<ModuleDto[]>;
    /**
     * @return Success
     */
    activitiesOfCourse(id: number): Promise<ActivityDto[]>;
    /**
     * @return Success
     */
    course2(id: number): Promise<UserDto[]>;
    /**
     * @param body (optional) 
     * @return Success
     */
    userPATCH(username: string, body?: Operation[] | undefined): Promise<void>;
    /**
     * @return Success
     */
    getAllStudents(): Promise<UserDto[]>;
    /**
     * @param body (optional) 
     * @return Success
     */
    userPOST(body?: UserForCreationDto | undefined): Promise<UserDto>;
}

export class Client implements IClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance || axios.create();

        this.baseUrl = baseUrl ?? "";

    }

    /**
     * @param searchText (optional) 
     * @param endDate (optional) 
     * @param startDate (optional) 
     * @return Success
     */
    //GET: All courses
    courses(searchText?: string | undefined, endDate?: Date | undefined, startDate?: Date | undefined, signal?: AbortSignal): Promise<CourseDto[]> {
        let url_ = this.baseUrl + "/api/courses?";
        if (searchText === null)
            throw new Error("The parameter 'searchText' cannot be null.");
        else if (searchText !== undefined)
            url_ += "SearchText=" + encodeURIComponent("" + searchText) + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "EndDate=" + encodeURIComponent(endDate ? "" + endDate.toISOString() : "") + "&";
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartDate=" + encodeURIComponent(startDate ? "" + startDate.toISOString() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCourses(_response);
        });
    }

    protected processCourses(response: AxiosResponse): Promise<CourseDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(CourseDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<CourseDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<CourseDto[]>(null as any);
    }

    /**
     * @return Success
     */
    //GET: A course by Course ID
    getCourse(id: number, signal?: AbortSignal): Promise<CourseDto> {
        let url_ = this.baseUrl + "/api/courses/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetCourse(_response);
        });
    }

    protected processGetCourse(response: AxiosResponse): Promise<CourseDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            result200 = CourseDto.fromJS(resultData200);
            return Promise.resolve<CourseDto>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<CourseDto>(null as any);
    }

    /**
     * @return Success
     */
    //GET: All modules of a course by Course ID
    modulesOfCourse(id: number, signal?: AbortSignal): Promise<ModuleDto[]> {
        let url_ = this.baseUrl + "/api/modules/course/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCourse(_response);
        });
    }

    protected processCourse(response: AxiosResponse): Promise<ModuleDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(ModuleDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<ModuleDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ModuleDto[]>(null as any);
    }

    /**
     * @return Success
     */
    //GET: All activities of a module by Module ID
    activitiesOfCourse(id: number, signal?: AbortSignal): Promise<ActivityDto[]> {
        let url_ = this.baseUrl + "/api/modules/activities/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processActivities(_response);
        });
    }

    protected processActivities(response: AxiosResponse): Promise<ActivityDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            result200 = ModuleDto.fromJS(resultData200);
            return Promise.resolve<ActivityDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ActivityDto[]>(null as any);
    }

    /**
     * @return Success
     */
    //GET: All users of a course by Course ID
    course2(id: number, signal?: AbortSignal): Promise<UserDto[]> {
        let url_ = this.baseUrl + "/api/User/course/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCourse2(_response);
        });
    }

    protected processCourse2(response: AxiosResponse): Promise<UserDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(UserDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<UserDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserDto[]>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    userPATCH(username: string, body?: Operation[] | undefined, signal?: AbortSignal): Promise<void> {
        let url_ = this.baseUrl + "/api/User/{username}";
        if (username === undefined || username === null)
            throw new Error("The parameter 'username' must be defined.");
        url_ = url_.replace("{username}", encodeURIComponent("" + username));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "PATCH",
            url: url_,
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUserPATCH(_response);
        });
    }

    protected processUserPATCH(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(null as any);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    getAllStudents(signal?: AbortSignal): Promise<UserDto[]> {
        let url_ = this.baseUrl + "/api/User";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAllStudents(_response);
        });
    }

    protected processGetAllStudents(response: AxiosResponse): Promise<UserDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(UserDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<UserDto[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserDto[]>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    userPOST(body?: UserForCreationDto | undefined, signal?: AbortSignal): Promise<UserDto> {
        let url_ = this.baseUrl + "/api/User";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "application/json"
            },
            signal
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUserPOST(_response);
        });
    }

    protected processUserPOST(response: AxiosResponse): Promise<UserDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200 = _responseText;
            result200 = UserDto.fromJS(resultData200);
            return Promise.resolve<UserDto>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserDto>(null as any);
    }
}

export class ActivityDto implements IActivityDto {
    id?: number;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;

    constructor(data?: IActivityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.description = _data["description"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
            this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): ActivityDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActivityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface IActivityDto {
    id?: number;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;
}

export class CourseDto implements ICourseDto {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;

    constructor(data?: ICourseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
            this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface ICourseDto {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;
}

export class ModuleDto implements IModuleDto {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    activities?: ActivityDto[] | undefined;

    constructor(data?: IModuleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
            this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>undefined;
            if (Array.isArray(_data["activities"])) {
                this.activities = [] as any;
                for (let item of _data["activities"])
                    this.activities!.push(ActivityDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ModuleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ModuleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        if (Array.isArray(this.activities)) {
            data["activities"] = [];
            for (let item of this.activities)
                data["activities"].push(item.toJSON());
        }
        return data;
    }
}

export interface IModuleDto {
    id?: number;
    name?: string | undefined;
    description?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    activities?: ActivityDto[] | undefined;
}

export class Operation implements IOperation {
    operationType?: OperationType;
    path?: string | undefined;
    op?: string | undefined;
    from?: string | undefined;
    value?: any | undefined;

    constructor(data?: IOperation) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.operationType = _data["operationType"];
            this.path = _data["path"];
            this.op = _data["op"];
            this.from = _data["from"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): Operation {
        data = typeof data === 'object' ? data : {};
        let result = new Operation();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["operationType"] = this.operationType;
        data["path"] = this.path;
        data["op"] = this.op;
        data["from"] = this.from;
        data["value"] = this.value;
        return data;
    }
}

export interface IOperation {
    operationType?: OperationType;
    path?: string | undefined;
    op?: string | undefined;
    from?: string | undefined;
    value?: any | undefined;
}

export enum OperationType {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
}

export class UserDto implements IUserDto {
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;

    constructor(data?: IUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.username = _data["username"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): UserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["username"] = this.username;
        data["email"] = this.email;
        return data;
    }
}

export interface IUserDto {
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
}

export class UserForCreationDto implements IUserForCreationDto {
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;

    constructor(data?: IUserForCreationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.username = _data["username"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): UserForCreationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserForCreationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["username"] = this.username;
        data["email"] = this.email;
        return data;
    }
}

export interface IUserForCreationDto {
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}