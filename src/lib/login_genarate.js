import CyrillicToTranslit from "cyrillic-to-translit-js";

export function gen_login(name){
    const cyrillicToTranslit = new CyrillicToTranslit();
    let student_name = name.split(" ");
    let login_number;

    if (student_name.length >= 2){
        const login = cyrillicToTranslit.transform(student_name[1].toLowerCase());
        login_number = login+(Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString();
    } else {
        throw new Error("Invalid name passed into gen_login!")
    }

    return login_number;
}
