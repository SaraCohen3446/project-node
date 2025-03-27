import { connect } from "mongoose";

export function connectToDb() {
    let DB_URL=process.env.DB_URL;
    connect(DB_URL)
        .then(con => console.log("mogo Db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err);
            process.exit(1)
        })
}
