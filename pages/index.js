//Next系インポート
import Head from "next/head";
import Link from "next/link";

//チャクラUIインポート
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorMode,
  Input,
  Center,
  Button,
  HStack,
} from "@chakra-ui/react";

//recoilインポート
import { useRecoilState } from "recoil";
import { countState, userState, todoState } from "../components/atoms";

//リアクトフック系インポート
import { useState } from "react";
import { useForm } from "react-hook-form";

//HOME出力
export default function Home() {
  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* react-hook-form ここまで */

  /* react-hook-form useFormからデータ受け取り、setTodosへセット */
  // ToDo追加
  const onSubmit1 = (todo) => {
    setTodos([...todos, todo.strTitle1]);
    setrecoTodos([...todos, todo.strTitle1]);

    console.log(todo);
  };

  // todoを削除する
  const deleteTodo = (index) => {
    const newTodos = recotodos.filter((todo, todoIndex) => {
      return index !== todoIndex;
    });
    setTodos(newTodos);
    setrecoTodos(newTodos);
  };

  // todoを変更する処理
  const onSubmit2 = (temp) => {
    const newArray = recotodos.map((value, index) => {
      if (index == temp.editNum) {
        return temp.editTitle;
      } else {
        return value;
      }
    });

    console.log(newArray);
    setrecoTodos(newArray);
  };

  const [todos, setTodos] = useState([]);
  const [recotodos, setrecoTodos] = useRecoilState(todoState);

  // Todoここまで

  /* ユーザ情報変更 ここから */

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
        <title>Next ToDo登録アプリ</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ヘッダー ここまで*/}

      {/* メイン ここから*/}
      <main>
        <h1>
          <Heading mb={6}>
            <Center>Next ToDo登録アプリ</Center>
          </Heading>
        </h1>
        <div>
          <form>
            <Center>
              <HStack spacing="5px" p="5px">
                <Text w={200}>タイトル入力：</Text>
                <Input {...register("strTitle1", { required: true })} />
                <Button onClick={handleSubmit(onSubmit1)}>Add</Button>
              </HStack>
            </Center>
            <Center>
              {errors.strTitle1 && (
                <p>必須です。タイトルを入力してください。</p>
              )}
            </Center>
          </form>
        </div>
        <br /> <br />
        <ul>
          {/* なぜかエラーでる。。。。 Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.*/}
          {recotodos.map((todo, index) => {
            return (
              <li key={index}>
                <Center>
                  <HStack spacing="5px">
                    <Box
                      boxShadow="inner"
                      p="3"
                      margin="2"
                      rounded="md"
                      bg="#FFFAE7"
                    >
                      ID:{index}　 タイトル：
                      {todo}
                    </Box>
                    <Link href={"./" + index + "?username=" + user.name}>
                      <Button>編集</Button>
                    </Link>
                    <Button margin={2} onClick={() => deleteTodo(index)}>
                      x 削除
                    </Button>
                  </HStack>
                </Center>
              </li>
            );
          })}
        </ul>
        <hr />
        <h1>ID指定編集</h1>
        <Center>
          <p>編集したいIDを入力:</p>
          <Input w={50} {...register("editNum", { required: false })} />
          <p>　タイトルを入力:</p>
          <Input w={200} {...register("editTitle", { required: false })} />
          <Button margin={2} onClick={handleSubmit(onSubmit2)}>
            編集
          </Button>
          <br />
          <br />
        </Center>
        <hr />
        <div>
          <Link href="./about">⇒ユーザの名前確認と変更へGo!</Link>
        </div>
        <br />
        <br />
      </main>
      {/* メイン ここまで*/}
    </>
  );
}
