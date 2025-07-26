export const sponsorTiers = {
  bronze: {
    price: 5,
    roleId: process.env.BRONZE_ROLE_ID,
    artifactDir: './artifacts/bronze'
  },
  silver: {
    price: 15,
    roleId: process.env.SILVER_ROLE_ID,
    artifactDir: './artifacts/silver'
  },
  gold: {
    price: 50,
    roleId: process.env.GOLD_ROLE_ID,
    artifactDir: './artifacts/gold'
  },
  legendary: {
    price: 200,
    roleId: process.env.LEGENDARY_ROLE_ID,
    artifactDir: './artifacts/legendary'
  }
};