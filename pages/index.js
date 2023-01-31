//Next系インポート
import Head from "next/head";
import Link from "next/link";

//チャクラUIインポート
import {
  Box,
  Divider,
  Heading,
  Text,
  Input,
  Center,
  Button,
  HStack,
} from "@chakra-ui/react";

//recoilインポート
import { useRecoilState } from "recoil";
import { userState, todoState } from "../components/atoms";

//リアクトフック系インポート
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [todos, setTodos] = useState([]);
  const [recotodos, setrecoTodos] = useRecoilState(todoState);

  // todoを変更する処理
  const onSubmit2 = (temp) => {
    reset(); // <= 引数0だとすべてをreset
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

  return (
    <Box mb={10}>
      <h1>ID指定編集</h1>
      <form onSubmit={handleSubmit(onSubmit2)} id="form2">
        <Center>
          <p>編集したいIDを入力:</p>
          <Input w={50} {...register("editNum", { required: false })} />
          <p>　タイトルを入力:</p>
          <Input w={200} {...register("editTitle", { required: false })} />
          <Button type="submit">編集</Button>
        </Center>
      </form>
    </Box>
  );
};

//HOME出力
export default function Home() {
  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* react-hook-form ここまで */

  /* react-hook-form useFormからデータ受け取り、setTodosへセット */
  // ToDo追加
  const onSubmit1 = (todo) => {
    reset(); // <= 引数0だとすべてをreset
    setTodos([...todos, todo.strInputTodoTitle]);
    setrecoTodos([...todos, todo.strInputTodoTitle]);

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

  // Todoここまで

  /* ユーザ情報変更 ここから */
  const [user, setUser] = useRecoilState(userState);
  const [todos, setTodos] = useState([]);
  const [recotodos, setrecoTodos] = useRecoilState(todoState);
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
        <Heading>
          <Center>Next ToDo登録アプリ</Center>
        </Heading>
        <Box m={20}>
          <form onSubmit={handleSubmit(onSubmit1)} id="form1">
            <Center>
              <HStack spacing="5px" p="5px">
                <Text w={200}>タイトル入力：</Text>
                <Input {...register("strInputTodoTitle", { required: true })} />
                <Button type="submit">Add</Button>
              </HStack>
            </Center>
            <Center>
              {errors.strInputTodoTitle && (
                <p>必須です。タイトルを入力してください。</p>
              )}
            </Center>
          </form>
        </Box>
        <Box mb={10}>
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
        </Box>
        <Divider orientation="horizontal" />
        <EditForm />

        <Divider orientation="horizontal" />
        <Box mb="5">
          <Link href="./about">⇒ユーザの名前確認と変更へGo!</Link>
        </Box>
        <Divider orientation="horizontal" />
      </main>
      {/* メイン ここまで*/}
    </>
  );
}
