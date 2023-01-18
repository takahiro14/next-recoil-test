//Next系インポート
import Head from "next/head";
import Link from "next/link";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

//チャクラUIインポート
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorMode,
  Input,
} from "@chakra-ui/react";

//recoilインポート
import { useRecoilState } from "recoil";
import { countState, userState, todoState } from "../components/atoms";

//リアクトフック系インポート
import { useState } from "react";
import { useForm } from "react-hook-form";

//HOME出力
export default function Home() {
  //atomの値の操作を定義（read,write)
  const [count, setCount] = useRecoilState(countState);

  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* react-hook-form useFormからデータ受け取り、setTodosへセット */
  // ToDo追加
  const onSubmit1 = (todo) => {
    setTodos([...todos, todo.strTitle1]);
    setrecoTodos([...todos, todo.strTitle1]);

    console.log(recotodos);
  };

  // todoを削除する処理
  const deleteTodo = (index) => {
    const newTodos = recotodos.filter((todo, todoIndex) => {
      return index !== todoIndex;
    });
    setTodos(newTodos);
    setrecoTodos(newTodos);
  };

  const [todos, setTodos] = useState([]);
  const [recotodos, setrecoTodos] = useRecoilState(todoState);
  // Todoここまで
  /* react-hook-form ここまで */

  /* ユーザ情報変更 ここから */
  //count increment処理
  const increment = (c) => {
    return c + 1;
  };

  //userのageをカウントアップ（機能としては意味無し）
  const updateUser = (u) => {
    return { ...u, ...{ age: u.age + 1 } };
  };

  const [tmpUsername, setUsername] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const changeUsername = (u) => {
    // formの内容が空白の場合はalertを出す
    if (tmpUsername === "") {
      alert("文字を入力してください");
      return;
    }
    console.log(tmpUsername);
    console.log(u);
    //setUser([...user, { name:tmpUsername}]);
    return { ...u, ...{ name: tmpUsername } };
  };

  /* ユーザ情報変更 ここまで */

  return (
    <>
      {/* ヘッダー ここから*/}
      <Head>
        <title>Next ToDoアプリ</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ヘッダー ここまで*/}

      {/* メイン ここから*/}
      <main>
        <h1>chakra-ui---</h1>
        <label>Chakra UI</label>
        <Text p={"1px"}>Small Text</Text>

        <Box boxShadow="inner" p="6" rounded="md" bg="red">
          Box
        </Box>
        <Heading mb={6}>Log in</Heading>
        <Input
          placeholder="lazar@chakra-ui.com"
          variant="filled"
          mb={3}
          type="email"
        />
        <Input placeholder="*******" variant="filled" mb={6} type="password" />
        <br />
        <hr />
        <br />
        <br />
        <h1 style={{ color: "red" }}>Todo-------</h1>
        <div>
          タイトル：
          <input {...register("strTitle1", { required: true })} />
          <br />
          {errors.strTitle1 && <p>必須です。タイトルを入力してください。</p>}
          <button onClick={handleSubmit(onSubmit1)}>Add</button>
          {/* <button onClick={addTodo}>Add</button> */}
        </div>
        <ul>
          {/* なぜかエラーでる。。。。 Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.*/}
          {recotodos.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                --{index}
                {/* <button onClick={() => deleteTodo(index)}>-x-</button>
                <Link href={"./" + index + "?username=" + user.name}>編集</Link> */}
              </li>
            );
          })}
        </ul>

        <hr />
        <br />
        <h1>ユーザ情報変更---</h1>
        <div>
          <p suppressHydrationWarning={true}>ユーザの名前:{user.name}</p>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={() => setUsername(user.name)}
          />
          <button onClick={() => setUser(changeUsername)}>変更</button>
          <p suppressHydrationWarning={true}>ユーザの年齢:{user.age}</p>
          <button onClick={() => setUser(updateUser)}>
            年齢増やします。。。
          </button>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <Link href="./about">aboutへGo!</Link>
        </div>
        <br />
        <br />
        <br />
      </main>
      {/* メイン ここまで*/}
    </>
  );
}
