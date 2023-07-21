export default class User {
    id: string;
    name: string;
    email: string;
    bio: string;

    constructor(data?: {id: string, name: string, email: string, bio: string}) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.bio = data.bio;
        }
        this.id = "";
        this.name = "";
        this.email = "";
        this.bio = "";
    }
}