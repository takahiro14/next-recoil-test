import React from "react";

//Next系インポート
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

export function Cardlist({ children }: any) {
  //入れたらできた。
  const [todos, setTodos] = useState([]);
  const [recotodos, setrecoTodos] = useRecoilState(todoState);

  // todoを削除する
  const deleteTodo = (index) => {
    const newTodos = children.filter((todo1, todoIndex) => {
      return index !== todoIndex;
    });
    setTodos(newTodos);
    setrecoTodos(newTodos);
  };

  return (
    <>
      <Box mb={10}>
        <ul>
          {children.map((todo, index) => {
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
                    <Link href={"./" + index + "?username="}>
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
    </>
  );
}
