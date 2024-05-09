export interface DtoTranmision{

    title:String,
    description:String,
    user:{
        name: String,
        email: String,
        imgProfile: String
    },
    views: number
    likes: number
    dislikes: number 
    _id:number    

}

export interface Transmision {
    title:String,
    description:String,
    user:{
        name: String,
        email: String,
        imgProfile: String
    }
}