import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { countState, userState, todoState } from "../components/atoms";

const product = () => {
  //atomの値の操作を定義（read only)
  const count = useRecoilValue(countState);
  const user = useRecoilValue(userState);
  const todos = useRecoilValue(todoState);

  const router = useRouter();
  const { id, username } = router.query;
  console.log(router.query);

  return (
    <div>
      <p>送られてきたUserName---{username}</p>
      <p>送られてきたID---{id}</p>
      <p>IDに紐づいたToDo↓</p>
      <ul>
        {todos
          // .filter((todo, index) => index == id)
          .filter((todos) => todos.index == id)
          .map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                --{index}
                <input
                  type="text"
                  name="todotitle"
                  value={todo}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={() => setUser(changeUsername)}>変更</button>
              </li>
            );
          })}
      </ul>
      <div></div>
      <div>
        <Link href="./">Homeへ戻る</Link>
      </div>
    </div>
  );
};

export default product;
