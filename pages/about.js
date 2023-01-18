import Link from "next/link";
import { useRecoilState } from "recoil";
import { countState, userState, todoState } from "../components/atoms";

//リアクトフック系インポート
import { useForm } from "react-hook-form";

const About = () => {
  //atomの値の操作を定義（read only)
  // const count = useRecoilValue(countState);
  // const user = useRecoilValue(userState);
  // const todos = useRecoilValue(todoState);

  /* react-hook-form ここから */
  /* useForm使用準備 =>hook-formはこういう設定ということで内容は深く考えない。。*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* react-hook-form ここまで */

  const [user, setUser] = useRecoilState(userState);

  // todoを変更する処理
  const onSubmit1 = (temp) => {
    console.log(temp.editName);
    setUser({ ...user, ...{ name: temp.editName } });
  };

  const changeUsername = (u) => {
    // formの内容が空白の場合はalertを出す
    if (u.name === "") {
      alert("文字を入力してください");
      return;
    }
    console.log(u.name);
    return { ...u, ...{ name: u.name } };
  };

  return (
    <>
      <div>
        <p suppressHydrationWarning={true}>ユーザの名前:{user.name}</p>
        <input
          placeholder={user.name}
          {...register("editName", { required: true })}
        />
        {errors.editName && <p>必須です。入力してください。</p>}
        <button onClick={handleSubmit(onSubmit1)}>変更</button>
      </div>
      <div>
        <Link href="./">Homeへ戻る</Link>
      </div>
    </>
  );
};

export default About;
