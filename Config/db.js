import { connect } from "mongoose";

export function connectToDb(){
    connect(process.env.DB_URL)
    .then(con => console.log("mongo DB connected"))
    .catch(err=> {
        console.log("cannot connact mongo db",err)
        process.exit(1)
    })
}