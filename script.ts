const url:string = 'https://api.thecatapi.com/v1/images/search';
const button:HTMLButtonElement | null = document.querySelector('button')
const tableBody:HTMLTableElement | null = document.querySelector('#table-body')

interface AppleType {
    id:string;
    url:string;
    height:number;
    width:number;
    test?: boolean;
}

class Apple implements AppleType {
    id: string;
    url:string;
    height:number;
    width:number;

    constructor(id:string,url:string,height:number,width:number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    public static addData(data:AppleType):void {
        const apple:Apple = new Apple(data.id, data.url, data.height, data.width);
        const tableRow:HTMLTableRowElement = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${apple.id}</td>
            <td><img src="${apple.url}" /></td>
            <td>${apple.height.toString()}</td>
            <td>${apple.width.toString()}</td>
            <td>${apple.url}</td>
            <td><a href="#">x</a></td>
        `;
        tableBody?.appendChild(tableRow);
    }
    public static deleteData(deleteButton:HTMLAnchorElement):void{
        const td = deleteButton.parentElement as HTMLTableCellElement;
        const tr = td.parentElement as HTMLTableRowElement;
        tr.remove();
    }
}

async function getJSON<T>(url:string):Promise<T> {
    const response:Response = await fetch(url);
    const json:Promise<T> = await response.json();
    return json;
}

async function getData():Promise<void> {
    try {
        const json:AppleType[] = await getJSON<AppleType[]>(url);
        const data:AppleType = json[0];
        WebDisplay.addData(data);
    } catch (error:Error | unknown) {
        let message:string;
        if(error instanceof Error){
            message = error.message;
        }else{
            message = String(error);
        }
        console.log(error);
    }
}

button?.addEventListener<'click'>('click', getData);

tableBody?.addEventListener<'click'>('click',(ev:MouseEvent) => {
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
})