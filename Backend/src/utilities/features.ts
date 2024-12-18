
import mongoose from "mongoose";

interface QueryString {
    page?: number | any;  
    limit?: number | any;  
    sort?: string;         
    fields?: string;    
    search?: string;          
    lang?: string;            
    [key: string]: any;       
}

class Features {

    public paginationResults: any;

constructor( public mongooseQuery: mongoose.Query<any[], any>, private readonly queryString: QueryString) {

}
    filter() {
        const queryStringObj: any = {...this.queryString};
        const excutedFields: string[] = ["page", "fields", "sort", "limit", "search", "lang"];
        excutedFields.forEach(field => delete queryStringObj[field]);
        let queryStr: string = JSON.stringify(queryStringObj); // or
        // for (const field of excutedFields) {
        //     delete queryStringObj[field];
        // }
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); 
        this. mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if( this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortBy)
        } else this.mongooseQuery.sort('-createdAt')
        return this;
    }
    // بيقسم الداتا
    pagination(documentCount: number) {    
            const page = this.queryString.page! * 1 || 1;
            const limit = this.queryString.limit! * 1 || 20;
            const skip = (page - 1) * limit ;
            const endIndex =  page * limit;
            const pagination: any = {};
            pagination.curruntPage = page;
            pagination.limit = limit;
            pagination.totalPages = Math.ceil( documentCount / limit);
            if ( endIndex < documentCount) pagination.next = page + 1;
            if (skip > 0) pagination.prev = page - 1;
            this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
            this.paginationResults = pagination;
            return this;
        }
    search( modelName?: string) {
        if( this.queryString.search) {
            // const searchQuery = modelName === 'products'
            //     ? { $text: { $search: this.queryString.search } }
            //     : { $or: fields.map(field => ({ [field]: new RegExp(this.queryString.search, 'i') })) };
            //     this.mongooseQuery = this.mongooseQuery.find(searchQuery);
            let searchQuery: any;
            if ( modelName == 'products') {
                searchQuery = { $or:[
                    { name: new RegExp(this.queryString.search, 'i')},
                    { description: new RegExp(this.queryString.search, 'i')}
                ]};
            } else {
                searchQuery = { name: new RegExp(this.queryString.search, 'i')};
            }
            this.mongooseQuery = this.mongooseQuery.find(searchQuery);
        }
        return this;
    }

    limitFields() {
        if( this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(fields)
        } else this.mongooseQuery.select('-__v')
        return this;
    }


}

export default Features;