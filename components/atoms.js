import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

//count
export const countState = atom({
    key: "count",
    default: 0
});

//user
export const userState = atom({
    key: "user",
    default: {
        name: "hoge",
        age: 11
    },
    effects_UNSTABLE: [persistAtom] //追加
});

export const todoState = atom({
    key: "todo",
    default: [],
    effects_UNSTABLE: [persistAtom] //追加
});




