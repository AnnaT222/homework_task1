import fs from "fs";
import path, { resolve } from "path";
import _ from "lodash";
let all = []
function update() {
    all = []
    fs.readdir("./", (err, data) => {
        if (err) {
            console.log("there isn't any files");
        } else {
            data.forEach(file => {
                all.push({
                    name: file,
                    type: path.extname(file) ? 'file' : 'directory'
                })
            });
        }
        all = _.sortBy(all, (obj) => obj.type)
        console.table(all);
    })
}

process.stdin.on('data', (data) => {
    data = data.toString().trim()
    switch (true) {
        case data == "ls":
            update()
            break;
        case data.startsWith("add "):
            const fileName = data.slice(4);
            fs.appendFile(fileName, '', (err) => {
                if (err) {
                    console.log("Something went wrong!");
                } else {
                }
            })
            break;
        case data.startsWith("rn "):
            fs.rename(...data.slice(3).split(" "), (err) => {
                if (err) {
                    console.log("Sth went wrong");
                } else {
                }
            })
            break;
        case data.startsWith("cp "):
            const coppied = data.slice(3).split(" ")
            fs.copyFile(coppied[0], coppied[1], (err) => {
                if (err) {
                    console.log("Sth went wrong");
                } else {
                }
            })
            break;
        case data.startsWith("mv "):
            const [oldPath, folder] = data.slice(3).split(" ")
            fs.rename(oldPath, resolve(folder, oldPath), (err) => {
                if (err) {
                    console.log("2nd should be folder name");
                } else {
                }
            })
            break;
        case data.startsWith("rm "):
            const path_to_file = data.slice(3)
            fs.unlink(path_to_file, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File deleted successfuly!");
                }
            })
            break;
        default:
            break;
    }
})