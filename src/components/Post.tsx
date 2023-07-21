import Sandwich from '@/models/Sandwich';
import './Post.css';

type PostProps = {
    sandwich: Sandwich
}

export default function Post({ sandwich }: PostProps) {

    // useEffect(() => {
    //     getUser(sandwich.userId)
    //         .then(res => {
    //             setUser(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, [])

    // let handler = () => {
    //     navigation.navigate('PostFull', { id: sandwich.id });
    // }

    return (
        <div className='Post'>
            <p className='PostTitle'> {sandwich.name} </p>
            <img src={sandwich.imageUrl} width={200} height={200} alt={sandwich.name + " image"} />
            <p className='PostUser'>Par {sandwich.userId} </p>
        </div>
    );
}