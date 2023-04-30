export default function generalValidation(inputs: Array<any>) {
    for(let input in inputs) {
        if (input == undefined) return false;
    }
    return true;
}