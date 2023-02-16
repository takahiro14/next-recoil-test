import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

//recoilインポート
import { useRecoilState } from "recoil";
import { countState, userState, todoState } from "../components/atoms";
import { setTodos, setrecoTodos } from "./index";

//リアクトフック系インポート
import { useState } from "react";
import { useForm } from "react-hook-form";

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

//コンポーネントインポート
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const product = () => {
  const [recotodos, setrecoTodos] = useRecoilState(todoState);

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
    alert("タイトルを変更しました");
  };

  const router = useRouter();
  const { id, username } = router.query;

  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* react-hook-form ここまで */

  return (
    <div>
      <Header />

      <Heading mb={5}>
        <Center>--編集画面--</Center>
      </Heading>
      <Center>
        <Box boxShadow="inner" p="3" margin="2" rounded="md" bg="#eee">
          <p>送られてきたUserName---{username}</p>
          <p>送られてきたID---{id}</p>
        </Box>
      </Center>
      <Center>
        <Box boxShadow="inner" p="3" margin="2" rounded="md" bg="#FFFAE7">
          <p>IDに紐づいたToDo↓</p>
          <ul>
            {recotodos
              .filter((todo, index) => index == id)
              .map((todo, index) => {
                return (
                  <li key={index}>
                    編集ID
                    <Input
                      value={id}
                      {...register("editNum", { required: false })}
                    />
                    タイトルを変更↓
                    <Input
                      placeholder={todo}
                      {...register("editTitle", { required: false })}
                    />
                    <Button onClick={handleSubmit(onSubmit2)}>変更する</Button>
                  </li>
                );
              })}
          </ul>
        </Box>
      </Center>
      <div>
        <Link href="./">Homeへ戻る</Link>
      </div>
      <Footer />
    </div>
  );
};

export default product;
