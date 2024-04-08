import { Text } from "@radix-ui/themes";
const supported_features = [
  {
    id: 1,
    question: "What is DodgeBaller?",
    answer:
      "DodgeBaller is a game built for Blobert NFT holders. It combines your Blobert's unique traits with a classic dodgeball challenge.",
  },
  {
    id: 2,
    question: "Mint a Dodgeball NFT",
    answer:
      "Your Blobert's features like armor, weapon, and material transform into a one-of-a-kind Dodgeball NFT for the game.",
  },
  {
    id: 3,
    question: "Earn Dodgecoin",
    answer: "Minting a Dodgeball NFT also rewards you with 1000 Dogecoin!",
  },
  {
    id: 4,
    question: "Sharpen Your Aim 🏹",
    answer:
      "Launch cannonballs at a target, aiming for a bullseye. Each bullseye earns you a hefty amount of Dodgecoin.",
  },
  {
    id: 5,
    question: "Dodge Financial Ruin",
    answer:
      "Every throw costs you a small amount of Dodgecoin. Can you hit the target and become a wealthy Blobert?",
  },
];

const planned_features = [
  {
    id: 1,
    question: "Blobert Trait Boosts",
    answer:
      "Allow certain Blobert traits to translate into in-game advantages. For example, a Blobert with a 'sharp weapon' trait could have a slightly higher chance of critical hits (worth more Dodgecoin).",
  },
  {
    id: 2,
    question: "Dodgeball Evolution",
    answer:
      "mplement a system where Dodgeball NFTs can be upgraded through gameplay or by merging them with other Dodgeballs, unlocking new abilities or visual enhancements.",
  },
  {
    id: 3,
    question: "Leaderboards",
    answer: "Track high scores and showcase the top Blobert Dodgeballers",
  },
];

export const FAQ = () => {
  return (
    <div className="mt-8">
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Curious You Are 🐟
        </h2>
        <div className="mb-2 mt-8">
          <dl className="divide-y divide-gray-200">
            {supported_features.map(({ question, answer, id }) => (
              <div
                className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                key={id}
              >
                <Text
                  className="text-base font-medium md:col-span-5"
                  color="crimson"
                >
                  {question}
                </Text>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <Text className="text-base">{answer}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4">
          <h2 className="my-8 block text-3xl font-bold tracking-tight">
            Getting Even More Blobtastic! 🚀
          </h2>
          <div className="mb-2 mt-8">
            <dl className="divide-y divide-gray-200">
              {planned_features.map(({ question, answer, id }) => (
                <div
                  className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                  key={id}
                >
                  <Text
                    className="text-base font-medium md:col-span-5"
                    color="crimson"
                  >
                    {question}
                  </Text>
                  <dd className="mt-2 md:col-span-7 md:mt-0">
                    <Text className="text-base">{answer}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
