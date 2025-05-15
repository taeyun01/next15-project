import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

// 테스트용 유저 데이터
const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/logo.jpg" },
  { id: "taeyun", nickname: "유태윤", image: "/tlogo.png" },
  { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.get(`${baseUrl}/api/postRecommends`, async ({ request }) => {
    console.log("추천게시글");
    // await delay(3000);
    console.log("딜레이 종료");
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;

    // 최대 20개의 포스트까지만 생성 (cursor가 15를 넘어가면 빈 배열 반환)
    if (cursor >= 15) {
      return HttpResponse.json([]);
    }

    return HttpResponse.json([
      {
        postId: cursor + 1,
        User: User[0],
        content: `${cursor + 1} 안녕 난 msw서버에서 내려온 데이터야.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20240731/0016/P001759776.jpg/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        User: User[0],
        content: `${cursor + 2} T.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
          {
            imageId: 2,
            link: "https://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        User: User[0],
        content: `${cursor + 3} T.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        User: User[0],
        content: `${cursor + 4} T.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20211225/P001547417.jpg/dims/resize/1280",
          },
          {
            imageId: 2,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20220211/P001563044.jpg/dims/resize/1280",
          },
          {
            imageId: 3,
            link: "https://pbs.twimg.com/profile_images/1688763174714245120/htmgYD32_400x400.jpg",
          },
          {
            imageId: 4,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20160408/P000265471.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        User: User[0],
        content: `${cursor + 5} T.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20211225/P001547417.jpg/dims/resize/1280",
          },
          {
            imageId: 2,
            link: "https://pbs.twimg.com/profile_images/1688763174714245120/htmgYD32_400x400.jpg",
          },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get(`${baseUrl}/api/followingPosts`, async ({ request }) => {
    await delay(3000);
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Stop following me. I'm too famous.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Stop following me. I'm too famous.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Stop following me. I'm too famous.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Stop following me. I'm too famous.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Stop following me. I'm too famous.`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get(`${baseUrl}/api/search/:tag`, ({ request, params }) => {
    const { tag } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} 검색결과 ${tag}`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} 검색결과 ${tag}`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} 검색결과 ${tag}`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} 검색결과 ${tag}`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} 검색결과 ${tag}`,
        Images: [
          {
            imageId: 1,
            link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20151214/P000224946.png/dims/resize/1280",
          },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get(`${baseUrl}/api/users/:userId/posts`, ({ request, params }) => {
    const { userId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get(`${baseUrl}/api/users/:userId`, ({ request, params }) => {
    const { userId } = params;
    const found = User.find((v) => v.id === userId);
    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json(
      { message: "no_such_user" },
      {
        status: 404,
      }
    );
  }),

  http.get(`${baseUrl}/api/posts/:postId`, ({ request, params }) => {
    const { postId } = params;
    // 포스트 아이디가 10보다 크면 404 에러 반환
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json(
        { message: "no_such_post" },
        {
          status: 404,
        }
      );
    }
    return HttpResponse.json({
      postId,
      User: User[0],
      content: `${1} 게시글 아이디 ${postId}의 내용`,
      Images: [
        { imageId: 1, link: faker.image.urlLoremFlickr() },
        { imageId: 2, link: faker.image.urlLoremFlickr() },
        { imageId: 3, link: faker.image.urlLoremFlickr() },
      ],
      createdAt: generateDate(),
    });
  }),

  http.get(`${baseUrl}/api/posts/:postId/comments`, ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get(`${baseUrl}/api/followRecommends`, ({ request }) => {
    return HttpResponse.json(User);
  }),
  http.get(`${baseUrl}/api/trends`, ({ request }) => {
    return HttpResponse.json([
      { tagId: 1, title: "유태윤", count: 1264 },
      { tagId: 2, title: "유태윤1", count: 1264 },
      { tagId: 3, title: "유태윤2", count: 1264 },
      { tagId: 4, title: "유태윤3", count: 1264 },
      { tagId: 5, title: "유태윤4", count: 1264 },
      { tagId: 6, title: "유태윤5", count: 1264 },
      { tagId: 7, title: "유태윤6", count: 1264 },
      { tagId: 8, title: "유태윤7", count: 1264 },
      { tagId: 9, title: "유태윤8", count: 1264 },
    ]);
  }),
];
