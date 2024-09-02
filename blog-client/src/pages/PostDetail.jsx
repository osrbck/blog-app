import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/logo-meu.svg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ad quaerat quae illo. Possimus cupiditate expedita sint ipsa totam culpa autem earum quis odio repellat libero iste rerum architecto cum molestiae omnis tempore tenetur, est corporis magni in asperiores! Fugit?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit cumque nobis expedita esse. Earum obcaecati iusto eum porro modi iste dolorum molestiae ipsum maiores nobis, provident eos impedit eius quos reiciendis, molestias itaque. Optio iste explicabo autem blanditiis beatae omnis maiores ea error deleniti obcaecati doloremque unde dolor, illo commodi labore voluptatum, architecto modi eum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid minima consequuntur pariatur aut rem recusandae delectus quis, ut neque repudiandae ex et. Facilis laboriosam mollitia voluptatibus, dignissimos beatae reprehenderit architecto temporibus itaque fugiat assumenda deleniti consectetur aliquid commodi ipsum incidunt! Nesciunt similique magni delectus aliquid reiciendis minima sapiente porro a corrupti nisi laboriosam quisquam perferendis esse tempore quod magnam et molestias earum, id, sit laborum. Vero illo, voluptates commodi nam deserunt nostrum eos dolorem ad. Exercitationem facere saepe dignissimos consectetur tempora? Quo consequatur esse aperiam ipsum tempora corporis, quisquam error quasi id doloremque optio, assumenda praesentium repellendus ipsam, placeat officia! Accusantium ipsa consequatur quos explicabo nihil, ullam animi quia quis delectus.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur ipsam hic reiciendis nemo ad, fuga ratione culpa optio molestiae alias pariatur quasi enim ex, expedita id dolorum perferendis laudantium cupiditate dolores at ullam excepturi dolorem. Excepturi quis officiis libero cum.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sapiente praesentium deserunt iusto accusantium quaerat vero aperiam. Expedita eum ea, praesentium, explicabo minima repellendus ipsum quis provident consequuntur, vitae optio culpa quaerat eos voluptatem. Nihil nemo maiores cumque praesentium assumenda eveniet modi distinctio quo. Facilis magnam quam dignissimos ducimus maxime cupiditate praesentium sequi exercitationem, reiciendis possimus ratione ullam. Nostrum cupiditate alias quae consequatur velit aliquam officiis dolor tenetur delectus. Cum sed obcaecati aliquid, neque, numquam sapiente magni, exercitationem sequi id quos atque aspernatur hic fugiat iusto! Nisi nemo autem nobis quaerat consequatur cupiditate tempore natus possimus praesentium consectetur deserunt, at ipsum odio architecto neque, optio sit dicta porro necessitatibus! Facere minus illo odio consectetur nostrum? Praesentium dolorum optio quisquam temporibus accusantium vel. Laboriosam eos, ad asperiores maiores in modi aspernatur optio deleniti veritatis. Quos quam soluta aperiam excepturi fugiat odit placeat voluptatem, ad debitis dolore commodi delectus vel nemo vitae!
        </p>
      </div>
    </section>
  )
}

export default PostDetail