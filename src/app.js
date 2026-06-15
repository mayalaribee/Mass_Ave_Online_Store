import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import { TextureLoader, Vector3 } from "three";

const catalog = {
  crestTeeOxford: {
    name: "Crest t-shirt oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199894672.jpg?v=1754063343&width=1220",
  },
  crestTeeNavy: {
    name: "Crest t-shirt navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199895040.jpg?v=1754063343&width=1220",
  },
  crestTeeWhite: {
    name: "Crest t-shirt white",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardCrestT-Shirt_White.jpg?v=1754063343&width=1220",
  },
  crestHoodCrimson: {
    name: "Crest Hood Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988176.jpg?v=1720623769&width=1220",
  },
  crestHoodNavy: {
    name: "Crest Hood Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199987681.jpg?v=1720623777&width=1220",
  },
  crestHoodOxford: {
    name: "Crest Hood Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988554.jpg?v=1720623764&width=1220",
  },
  benchmarkCrewNavy: {
    name: "Benchmark Crew Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008257.jpg?v=1720624426&width=1220",
  },
  benchmarkCrewRed: {
    name: "Benchmark Crew Red",
    image: "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008852.jpg?v=1720624387&width=1220",
  },
  benchmarkCrewOxford: {
    name: "Benchmark Crew Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200009444.jpg?v=1720624384&width=1220",
  },
  proWeaveCrewBlack: {
    name: "Pro- weave crew Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Crewneck-Quality-199940174.jpg?v=1750257160&width=1220",
  },
  proWeaveCrewOxford: {
    name: "Pro-weave crew Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-WeaveCrewneck_Oatmeal.jpg?v=1754063820&width=1220",
  },
  proWeaveHoodCrimson: {
    name: "Pro-weave hood Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199932325.jpg?v=1720622066&width=1220",
  },
  proWeaveHoodOatmeal: {
    name: "Pro-weave hood Oatmeal",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199931913.jpg?v=1720622085&width=1220",
  },
  harvardArcTeeCrimson: {
    name: "Harvard Arc T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeOxford: {
    name: "Harvard Arc T-Shirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896729.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeBlack: {
    name: "Harvard Arc T-Shirt - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896311.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeWhite: {
    name: "Harvard Arc T-Shirt - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardArcT-Shirt_White.jpg?v=1754063103&width=1220",
  },
  harvardCrestCrewneckCrimson: {
    name: "Harvard Crest Crewneck - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Crewneck-Quality-199994052.jpg?v=1720623986&width=1220",
  },
  harvardCrestCrewneckOxford: {
    name: "Harvard Crest Crewneck - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Crewneck-Quality-199994428.jpg?v=1720623958&width=1220",
  },
  harvardArcCrewneckCrimson: {
    name: "Harvard Arc Crewneck - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-Crewneck-Quality-199995115.jpg?v=1720624015&width=1220",
  },
  harvardArcCrewneckOxford: {
    name: "Harvard Arc Crewneck - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-Crewneck-Quality-199995558.jpg?v=1720623994&width=1220",
  },
  harvardHoodedArcSweatshirtCrimson: {
    name: "Harvard Hooded Arc Sweatshirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Arc-Sweatshirt-Quality-199898177.jpg?v=1720621069&width=1220",
  },
  harvardHoodedArcSweatshirtOxford: {
    name: "Harvard Hooded Arc Sweatshirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Arc-Sweatshirt-Quality-199897646.jpg?v=1720621060&width=1220",
  },
  theHSweaterCrimson: {
    name: "The H Sweater - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-H-Sweater-Varsity-200070268.jpg?v=1720626274&width=1220",
  },
  theHSweaterCream: {
    name: "The H Sweater - Cream",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-H-Sweater-Varsity-200070712.jpg?v=1720626276&width=1220",
  },
  proWeaveHoodCrimson2: {
    name: "Pro-Weave Hood - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199932325.jpg?v=1720622066&width=1220",
  },
  proWeaveHoodOatmeal2: {
    name: "Pro-Weave Hood - Oatmeal",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199931913.jpg?v=1720622085&width=1220",
  },
  harvardChampionReverseWeaveCrewOxford: {
    name: "Harvard Champion Reverse Weave Crew - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Champion-Reverse-Weave-Crew-Gear-For-Sports-200069520.jpg?v=1720626244&width=1220",
  },
  harvardChampionReverseWeaveCrewGarnet: {
    name: "Harvard Champion Reverse Weave Crew - Garnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Champion-Reverse-Weave-Crew-Gear-For-Sports-200069958.jpg?v=1720626226&width=1220",
  },
  harvardChampionReverseWeaveHoodieOxford: {
    name: "Harvard Champion Reverse Weave Hoodie - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Champion-Reverse-Weave-Hoodie-Gear-For-Sports-200068844.jpg?v=1720626209&width=1220",
  },
  harvardChampionReverseWeaveHoodieGarnet: {
    name: "Harvard Champion Reverse Weave Hoodie - Garnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Champion-Reverse-Weave-Hoodie-Gear-For-Sports-200068455.jpg?v=1720626211&width=1220",
  },
  harvardCollegiateHoodGarnet: {
    name: "Harvard Collegiate Hood - Garnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Collegiate-Hoodie-Atla-Global-200075472.png?v=1750259405&width=1220",
  },
  theClassicHarvardCrewGreen: {
    name: "The Classic Harvard Crew - Green",
    image: "https://www.theharvardshop.com/cdn/shop/files/TheClassicHarvardCrew_Green.jpg?v=1754063883&width=1220",
  },
  theCrestCrosswindQuarterZipBlack: {
    name: "The Crest Crosswind Quarter Zip - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/1_056df542-0c6f-4f72-b3e9-085130d13f19.png?v=1750256959&width=1220",
  },
  harvardPremiumHeatherFullZipGraphite: {
    name: "Harvard Premium Heather Full Zip - Graphite",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Premium-Heather-Full-Zip-Charles-River-200049439.jpg?v=1720625604&width=1220",
  },
  harvardPremiumHeatherFullZipOatmeal: {
    name: "Harvard Premium Heather Full Zip - Oatmeal",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Premium-Heather-Full-Zip-Charles-River-200048864.jpg?v=1720625617&width=1220",
  },
  harvardPatagoniaBetterSweater14Zip: {
    name: "Harvard Patagonia Better Sweater 1 - 4 Zip",
    image: "https://www.theharvardshop.com/cdn/shop/files/4-Zip-Patagonia-200043840.png?v=1720625447&width=1220",
  },
  thePremierHarvardFeltHoodNavy: {
    name: "The Premier Harvard Felt Hood - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Premier-Harvard-Felt-Hood-Ouray-199971994.jpg?v=1720623281&width=1220",
  },
  thePremierHarvardFeltHoodBlack: {
    name: "The Premier Harvard Felt Hood - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Flat_Lays_1005.png?v=1728330100&width=1220",
  },
  harvardPackNGoPulloverBlack: {
    name: "Harvard Pack-N-Go Pullover - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/11_26fde48f-6655-4842-aaa9-593554375ccf.png?v=1750256216&width=1220",
  },
  harvardPackNGoPulloverMaroon: {
    name: "Harvard Pack-N-Go Pullover - Maroon",
    image: "https://www.theharvardshop.com/cdn/shop/files/10_4160e886-16e2-4153-b78e-7fbd95eefd59.png?v=1750256216&width=1220",
  },
  vintageCrewTShirtOxford: {
    name: "Vintage Crew T-Shirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Vintage-Crew-T-Shirt-Quality-199915957.jpg?v=1720621597&width=1220",
  },
  vintageCrewSweatshirtOxford: {
    name: "Vintage Crew Sweatshirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Vintage-Crew-Sweatshirt-Quality-199910010.jpg?v=1720621434&width=1220",
  },
  theDarrenPullover: {
    name: "The Darren Pullover",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Darren-Pullover-Atla-Global-200072919.jpg?v=1720626348&width=1220",
  },
  harvardNikeVarsityPoloBlack: {
    name: "Harvard Nike Varsity Polo - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Nike-Varsity-Polo-Branded-Custom-Sportswear-200066247.jpg?v=1750102299&width=1220",
  },
  harvardNikeVarsityPoloCrimson: {
    name: "Harvard Nike Varsity Polo - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardNikeVarsityPolo_Crimson.jpg?v=1754063523&width=1220",
  },
  theHarvardNikeHoodieCrimson: {
    name: "The Harvard Nike Hoodie - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Harvard-Nike-Hoodie-Branded-Custom-Sportswear-200057053.jpg?v=1720625852&width=1220",
  },
  theHarvardNikePacer14Zip: {
    name: "The Harvard Nike Pacer 1 - 4 Zip",
    image: "https://www.theharvardshop.com/cdn/shop/files/32.png?v=1750090815&width=1220",
  },
  harvardNikeClubFleeceCrewneckGray: {
    name: "Harvard Nike Club Fleece Crewneck - Gray",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Nike-Club-Fleece-Crewneck-Branded-Custom-Sportswear-200053211.jpg?v=1720625742&width=1220",
  },
  nikeDriFitShortSleeveTeeBlack: {
    name: "Nike Dri-Fit Short Sleeve Tee - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Nike-Dri-Fit-Short-Sleeve-Tee-Branded-Custom-Sportswear-200035344.png?v=1720625189&width=1220",
  },
  nikeDriFitShortSleeveTeeCrimson: {
    name: "Nike Dri-Fit Short Sleeve Tee - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Nike-Dri-Fit-Short-Sleeve-Tee-Branded-Custom-Sportswear-200034136.jpg?v=1720625162&width=1220",
  },
  nikeDriFitShortSleeveTeeGray: {
    name: "Nike Dri-Fit Short Sleeve Tee - Gray",
    image: "https://www.theharvardshop.com/cdn/shop/files/Nike-Dri-Fit-Short-Sleeve-Tee-Branded-Custom-Sportswear-200034876.jpg?v=1720625166&width=1220",
  },
  theBabyHSweaterCream: {
    name: "The Baby H Sweater - Cream",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Baby-H-Sweater-Varsity-200075794.jpg?v=1720626412&width=1220",
  },
  theBabyHSweaterCrimson: {
    name: "The Baby H Sweater - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Baby-H-Sweater-Varsity-200075636.jpg?v=1720626415&width=1220",
  },
  theToddlerHSweaterCream: {
    name: "The Toddler H Sweater - Cream",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Toddler-H-Sweater-Varsity-200076643.jpg?v=1720626441&width=1220",
  },
  theToddlerHSweaterCrimson: {
    name: "The Toddler H Sweater - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Toddler-H-Sweater-Varsity-200076547.jpg?v=1720626444&width=1220",
  },
  harvardHInfantOnesieBlue: {
    name: "Harvard H Infant Onesie - Blue",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-H-Infant-Onesie-Quality-199913364.jpg?v=1720621532&width=1220",
  },
  harvardHInfantOnesieCrimson: {
    name: "Harvard H Infant Onesie - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-H-Infant-Onesie-Quality-199913150.jpg?v=1720621524&width=1220",
  },
  harvardHInfantOnesieWhite: {
    name: "Harvard H Infant Onesie - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-H-Infant-Onesie-Quality-199913555.jpg?v=1720621535&width=1220",
  },
  toddlerHarvardCrestTShirtOxford: {
    name: "Toddler Harvard Crest T-Shirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Toddler-Harvard-Crest-T-shirt-Quality-199949796.jpg?v=1720622600&width=1220",
  },
  toddlerHarvardCrestTShirtPink: {
    name: "Toddler Harvard Crest T-Shirt - Pink",
    image: "https://www.theharvardshop.com/cdn/shop/files/Toddler-Harvard-Crest-T-shirt-Quality-199949994.jpg?v=1720622605&width=1220",
  },
  harvardYouthCrestTShirtCrimson: {
    name: "Harvard Youth Crest T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Crest-T-Shirt-Quality-199901130.jpg?v=1720621180&width=1220",
  },
  harvardYouthCrestTShirtOxford: {
    name: "Harvard Youth Crest T-Shirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Crest-T-Shirt-Quality-199901396.jpg?v=1720621171&width=1220",
  },
  harvardYouthCrestTShirtPink: {
    name: "Harvard Youth Crest T-Shirt - Pink",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Crest-T-Shirt-Quality-199901586.jpg?v=1720621189&width=1220",
  },
  harvardYouthArcTShirtCrimson: {
    name: "Harvard Youth Arc T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Arc-T-Shirt-Quality-199905599.jpg?v=1720621326&width=1220",
  },
  harvardYouthArcTShirtOxford: {
    name: "Harvard Youth Arc T-Shirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Arc-T-Shirt-Quality-199905726.jpg?v=1720621319&width=1220",
  },
  youthHarvardCrestHoodedSweatshirtOxford: {
    name: "Youth Harvard Crest Hooded Sweatshirt - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Youth-Harvard-Crest-Hooded-Sweatshirt-Quality-199912443.jpg?v=1720621496&width=1220",
  },
  youthHarvardCrestHoodedSweatshirtCrimson: {
    name: "Youth Harvard Crest Hooded Sweatshirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Youth-Harvard-Crest-Hooded-Sweatshirt-Quality-199912293.jpg?v=1720621489&width=1220",
  },
  plaidPajamaPantsCrimson: {
    name: "Plaid Pajama Pants - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Plaid-Pajama-Pants-Concepts-Sport-200004480.jpg?v=1720624256&width=1220",
  },
  plaidPajamaPantsGrey: {
    name: "Plaid Pajama Pants - Grey",
    image: "https://www.theharvardshop.com/cdn/shop/files/Plaid-Pajama-Pants-Concepts-Sport-200004955.jpg?v=1720624264&width=1220",
  },
  theGarityShortsCrimson: {
    name: "The Garity Shorts - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Garity-Shorts-Atla-Global-200061861.png?v=1720626005&width=1220",
  },
  theGarityShortsBlack: {
    name: "The Garity Shorts - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Garity-Shorts-Atla-Global-200062351.png?v=1720626002&width=1220",
  },
  harvardPjShortsCharcoal: {
    name: "Harvard PJ Shorts - Charcoal",
    image: "https://www.theharvardshop.com/cdn/shop/files/3_c04889bf-f5eb-424a-bd96-cf5c1187f767.png?v=1754063561&width=1220",
  },
  harvardPjShortsCrimson: {
    name: "Harvard PJ Shorts - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardPJShorts.jpg?v=1754063561&width=1220",
  },
  dadTee: {
    name: "Harvard Dad T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Dad-T-Shirt-Quality-199941442.jpg?v=1720622360&width=1220",
  },
  momTee: {
    name: "Harvard Mom T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Mom-T-Shirt-Quality-199940895.jpg?v=1720622340&width=1220",
  },
  grandpaTee: {
    name: "Harvard Grandpa T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Grandpa-T-Shirt-Quality-199944332.jpg?v=1720622449&width=596",
  },
  grandmaTee: {
    name: "Harvard Grandma T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Grandma-T-Shirt-Quality-199945436.jpg?v=1720622480&width=1220",
  },
  brotherTee: {
    name: "Harvard Youth Brother T-Shirt",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Brother-T-Shirt-Quality-Graphics-200075133.jpg?v=1720626397&width=1220",
  },
  sisterTee: {
    name: "Harvard Youth Sister T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Youth-Sister-T-Shirt-Quality-200073834.jpg?v=1720626358&width=1220",
  },
  harvardLanyard: {
    name: "Harvard Lanyard",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Lanyard-Quality-199900831.jpg?v=1720621155&width=1220",
  },
  smallHarvardPennant: {
    name: "Small Harvard Pennant",
    image: "https://www.theharvardshop.com/cdn/shop/files/Small-Harvard-Pennant-Collegiate-Pacific-199903623.jpg?v=1720621241&width=1220",
  },
  largeHarvardPennant: {
    name: "Large Harvard Pennant",
    image: "https://www.theharvardshop.com/cdn/shop/files/Large-Harvard-Pennant-Collegiate-Pacific-199903459.jpg?v=1720621235&width=1220",
  },
  harvardJohnstonGateMagnet: {
    name: "Harvard Johnston Gate Magnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Johnston-Gate-Magnet-Pin-Badge-Maker-Company-199903125.jpg?v=1720621227&width=1220",
  },
  harvardWeeksBridgeMagnet: {
    name: "Harvard Weeks Bridge Magnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Weeks-Bridge-Magnet-Pin-Badge-Maker-Company-199914570.jpg?v=1720621550&width=596",
  },
  harvard1636PinGold: {
    name: "Harvard 1636 Pin - Gold",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-1636-Pin-Pin-Badge-Maker-Company-199959298.jpg?v=1720622888&width=1220",
  },
  harvardCrimsonHPinCrimson: {
    name: "Harvard Crimson H Pin - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crimson-H-Pin-Pin-Badge-Maker-Company-199958894.jpg?v=1720622878&width=1220",
  },
  harvardCrestPin: {
    name: "Harvard Crest Pin",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot_2026-04-01_at_3.33.46_PM.png?v=1775072039&width=1220",
  },
  harvardPinCrimson: {
    name: "Harvard Pin - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-22at4.05.05PM.png?v=1776888314&width=1220",
  },
  harvardHShieldPinCrimson: {
    name: "Harvard H Shield Pin - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-21at4.17.37PM_a6946a4c-7c2e-4ec8-a3c2-5ba52db8ee94.png?v=1776802723&width=1220",
  },
  harvardKennedySchoolPinCrimson: {
    name: "Harvard Kennedy School Pin - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Kennedy-School-Pin-Pin-Badge-Maker-Company-199958916.jpg?v=1720622884&width=1220",
  },
  harvardBusinessSchoolPinCrimson: {
    name: "Harvard Business School Pin - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-21at4.19.32PM.png?v=1776802800&width=1220",
  },
  iLoveHarvardKeychainCrimson: {
    name: "I <3 Harvard Keychain - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Enamel-H-Keychain-Pin-Badge-Maker-Company-199977330.jpg?v=1720623444&width=1220",
  },
  harvardEnamelCrestKeychainCrimson: {
    name: "Harvard Enamel Crest Keychain - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot_2026-04-01_at_3.34.49_PM.png?v=1775072123&width=1220",
  },
  harvardEnamelHKeychainCrimson: {
    name: "Harvard Enamel H Keychain - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Enamel-H-Keychain-Pin-Badge-Maker-Company-199977330.jpg?v=1720623444&width=1220",
  },
  pewterKeychainSilver: {
    name: "Pewter Keychain - Silver",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot_2026-04-21_at_4.22.37_PM.png?v=1776802978&width=1220",
  },
  harvardGraduateSchoolOfEducationEngravedKeychain: {
    name: "Harvard Graduate School of Education Engraved Keychain",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Engraved-Keychain-Pin-Badge-Maker-Company-199977418.jpg?v=1720623450&width=1220",
  },
  leatherCrestKeychainCrimson: {
    name: "Leather Crest Keychain - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Leather-Crest-Keychain-Pin-Badge-Maker-Company-199937669.jpg?v=1720622241&width=1220",
  },
  harvardLeatherKeychainBrown: {
    name: "Harvard Leather Keychain - Brown",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Leather-Keychain-Pin-Badge-Maker-Company-199900421.jpg?v=1720621145&width=1220",
  },
  wineBottleKeychain: {
    name: "Wine Bottle Keychain",
    image: "https://prodcdn-fch9gyh8ejf9hget.z01.azurefd.net/Product/DownloadImage?id=1e34c749-558e-41c7-849e-0ad1cb637294&size=40",
  },
  harvardBottleOpenerKeychainSilver: {
    name: "Harvard Bottle Opener Keychain - Silver",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-08at7.54.27PM.png?v=1775692513&width=1220",
  },
  harvardKeychainPlushieMonkey: {
    name: "Harvard Keychain Plushie - Monkey",
    image: "https://www.theharvardshop.com/cdn/shop/files/monkeyplush.jpg?v=1737845849&width=1220",
  },
  hCarDecalCrimson: {
    name: "H\" Car Decal - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/H_-Car-Decal-Quality-199916852.jpg?v=1720621620&width=1220",
  },
  storefrontSticker: {
    name: "Storefront Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Storefront-Sticker-StickerMule-200065461.png?v=1720626098&width=1220",
  },
  harvardMemorialChurchSticker: {
    name: "Harvard Memorial Church Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Memorial-Church-Sticker-StickerMule-200064526.png?v=1720626071&width=1220",
  },
  harvardGothicSticker: {
    name: "Harvard Gothic Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Gothic-Sticker-StickerMule-200045381.png?v=1720625493&width=1220",
  },
  harvardCrestSticker: {
    name: "Harvard Crest Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Sticker-StickerMule-200044932.png?v=1720625481&width=1220",
  },
  theRemySticker: {
    name: "The Remy Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/remysticker.png?v=1733150273&width=1220",
  },
  harvardShibaSticker: {
    name: "Harvard Shiba Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Shiba-Sticker-StickerMule-200045115.png?v=1720625487&width=1220",
  },
  harvardCartoonPennantSticker: {
    name: "Harvard Cartoon Pennant Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Cartoon-Pennant-Sticker-StickerMule-200044873.jpg?v=1720625479&width=1220",
  },
  harvardThreeToneSticker: {
    name: "Harvard Three Tone Sticker",
    image: "https://prodcdn-fch9gyh8ejf9hget.z01.azurefd.net/Product/DownloadImage?id=5baa15c4-93d0-4ae1-8c78-ccec0ca818ab&size=40",
  },
  adamsHouseSticker: {
    name: "Adams House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Adams-House-Sticker-StickerMule-200074488.png?v=1720626376&width=1220",
  },
  cabotHouseSticker: {
    name: "Cabot House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Cabot-House-Sticker-StickerMule-200074360.png?v=1720626373&width=1220",
  },
  currierHouseSticker: {
    name: "Currier House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Currier-House-Sticker-StickerMule-200074244.png?v=1720626370&width=1220",
  },
  dunsterHouseSticker: {
    name: "Dunster House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Dunster-House-Sticker-StickerMule-200074189.png?v=1720626367&width=1220",
  },
  eliotHouseSticker: {
    name: "Eliot House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Eliot-House-Sticker-StickerMule-200074696.png?v=1720626381&width=1220",
  },
  kirklandHouseSticker: {
    name: "Kirkland House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Kirkland-House-Sticker-StickerMule-200074036.png?v=1720626363&width=1220",
  },
  leverettHouseSticker: {
    name: "Leverett House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Leverett-House-Sticker-StickerMule-200075094.png?v=1720626393&width=1220",
  },
  lowellHouseSticker: {
    name: "Lowell House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Lowell-House-Sticker-StickerMule-200073999.png?v=1720626360&width=1220",
  },
  matherHouseSticker: {
    name: "Mather House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Mather-House-Sticker-StickerMule-200074913.png?v=1720626389&width=1220",
  },
  pforzheimerHouseSticker: {
    name: "Pforzheimer House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Pforzheimer-House-Sticker-StickerMule-200074555.png?v=1720626379&width=1220",
  },
  quincyHouseSticker: {
    name: "Quincy House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Quincy-House-Sticker-StickerMule-200074732.png?v=1720626383&width=1220",
  },
  winthropHouseSticker: {
    name: "Winthrop House Sticker",
    image: "https://www.theharvardshop.com/cdn/shop/files/Winthrop-House-Sticker-StickerMule-200074858.png?v=1720626387&width=1220",
  },
  harvardPencilSingle: {
    name: "Harvard Pencil - Single",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Pencil-Pin-Badge-Maker-Company-199939199.jpg?v=1720622283&width=1220",
  },
  whiteHarvardPenWhite: {
    name: "White Harvard Pen - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/White-Harvard-Pen-Quality-199911846.jpg?v=1720621476&width=1220",
  },
  redHarvardPenCrimson: {
    name: "Red Harvard Pen - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Red-Harvard-Pen-Quality-199912077.png?v=1720621478&width=1220",
  },
  harvardKeyperPhoneWalletWhite: {
    name: "Harvard Keyper Phone Wallet - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Keyper-Phone-Wallet-TheKeyper-199993731.jpg?v=1720623950&width=1220",
  },
  harvardKeyperPhoneWalletBlack: {
    name: "Harvard Keyper Phone Wallet - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Keyper-Phone-Wallet-TheKeyper-199993875.jpg?v=1720623947&width=1220",
  },
  harvardPewterMagnetClipSilver: {
    name: "Harvard Pewter Magnet Clip - Silver",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-21at4.23.46PM.png?v=1776803060&width=1220",
  },
  harvardHMagnetClipCrimson: {
    name: "Harvard H Magnet Clip - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-21at4.23.46PM.png?v=1776803060&width=1220",
  },
  harvardCanvasTote: {
    name: "Harvard Canvas Tote",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Canvas-Tote-Quality-200015313.jpg?v=1720624590&width=1220",
  },
  harvardLargeMoleskineNotebookBlack: {
    name: "Harvard Large Moleskine Notebook - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Large-Moleskine-Notebook-Quality-200038436.jpg?v=1720625283&width=1220",
  },
  harvardLargeMoleskineNotebookCrimson: {
    name: "Harvard Large Moleskine Notebook - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Large-Moleskine-Notebook-Quality-200038562.jpg?v=1720625287&width=1220",
  },
  harvardNotebook: {
    name: "Harvard Notebook",
    image: "https://www.theharvardshop.com/cdn/shop/files/5Q6A0010-3.jpg?v=1721073841&width=1220",
  },
  harvardPandaPlushieCrimson: {
    name: "Harvard Panda Plushie - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/plushiepanda.jpg?v=1737825839&width=1220",
  },
  harvardBearPlushieOxford: {
    name: "Harvard Bear Plushie - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Bear-Plushie-MCM-Brands-200064051.jpg?v=1720626057&width=1220",
  },
  harvardBearPlushieCrimson: {
    name: "Harvard Bear Plushie - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/63509_978_10inTraditionalBear_DK-RED_WEB.jpg?v=1780320473&width=1220",
  },
  harvardFolderBlack: {
    name: "Harvard Folder - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Folder-Roaring-Springs-199911673.jpg?v=1720621471&width=1220",
  },
  harvardFolderCrimson: {
    name: "Harvard Folder - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Folder-Roaring-Springs-199911592.jpg?v=1720621467&width=1220",
  },
  harvard32OzSportsBottleCrimson: {
    name: "Harvard 32 oz Sports Bottle - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-32-oz-Sports-Bottle-Quality-199965462.jpg?v=1720623082&width=1220",
  },
  endureBottleBlack: {
    name: "Endure Bottle - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Endure-Bottle-Quality-199965176.jpg?v=1720623069&width=1220",
  },
  harvardSteelWaterBottleCrimson: {
    name: "Harvard Steel Water Bottle - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Steel-Water-Bottle-Quality-199898726.jpg?v=1720621090&width=1220",
  },
  harvardCrestCordialShooter: {
    name: "Harvard Crest Cordial Shooter",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Cordial-Shooter-Quality-199956040.jpg?v=1720622793&width=1220",
  },
  harvardCrestWhiskeyShotGlassEtched: {
    name: "Harvard Crest Whiskey Shot Glass - Etched",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Whiskey-Shot-Glass-Quality-199976485.jpg?v=1720623415&width=1220",
  },
  harvardCrestShotGlassCrimson: {
    name: "Harvard Crest Shot Glass - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Shot-Glass-Quality-199956230.jpg?v=1720622798&width=1220",
  },
  harvardCrestPintGlass: {
    name: "Harvard Crest Pint Glass",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Pint-Glass-Quality-199956960.jpg?v=1720622819&width=1220",
  },
  harvardCrestWineGlass: {
    name: "Harvard Crest Wine Glass",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Wine-Glass-Quality-200003821.jpg?v=1720624239&width=1220",
  },
  harvardSteinGlass: {
    name: "Harvard Stein Glass",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Stein-Glass-Quality-199965755.jpg?v=1720623087&width=1220",
  },
  theRedHarvardMugRed: {
    name: "The Red Harvard Mug - Red",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Red-Harvard-Mug-Quality-199911398.jpg?v=1720621461&width=1220",
  },
  harvardCrestMugWhite: {
    name: "Harvard Crest Mug - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Mug-Quality-199960578.jpg?v=1720622929&width=1220",
  },
  harvardCrestMugCrimson: {
    name: "Harvard Crest Mug - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Mug-Quality-199960674.jpg?v=1720622938&width=1220",
  },
  harvardWidenerTumblerCrimson: {
    name: "Harvard Widener Tumbler - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-05-18at10.49.56AM.png?v=1779115846&width=1220",
  },
  harvardWidenerTumblerWhite: {
    name: "Harvard Widener Tumbler - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-05-18at10.50.08AM.png?v=1779115846&width=1220",
  },
  crestSpeckledMugCrimson: {
    name: "Crest Speckled Mug - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Crest-Speckled-Mug-Quality-199961688.jpg?v=1720622964&width=1220",
  },
  hShieldMug: {
    name: "H Shield Mug",
    image: "https://www.theharvardshop.com/cdn/shop/files/H-Shield-Mug-Quality-200020277.jpg?v=1720624738&width=1220",
  },
  harvardBistroMugIvory: {
    name: "Harvard Bistro Mug - Ivory",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Bistro-Mug-Quality-199956722.jpg?v=1720622811&width=1220",
  },
  harvardBallCapBlack: {
    name: "Harvard Ball Cap - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Flat_Lays_1005_4.png?v=1750259629&width=1220",
  },
  harvardBallCapWhite: {
    name: "Harvard Ball Cap - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/FlatLays1005_3.png?v=1750259629&width=1220",
  },
  harvardHeritageHat: {
    name: "Harvard Heritage Hat",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardHeritageHat.jpg?v=1754063465&width=1220",
  },
  harvardSkylineTruckerHat: {
    name: "Harvard Skyline Trucker Hat",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Skyline-Trucker-Hat-Quality-200044613.jpg?v=1720625474&width=1220",
  },
  harvardSerifHatBlack: {
    name: "Harvard Serif Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Serif-Hat-Quality-200039674.jpg?v=1720625323&width=1220",
  },
  harvardSerifHatCrimson: {
    name: "Harvard Serif Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Serif-Hat-Quality-200039824.jpg?v=1720625325&width=1220",
  },
  harvardVeritasHatBlack: {
    name: "Harvard Veritas Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Veritas-Hat-Quality-200043018.jpg?v=1720625421&width=1220",
  },
  harvardVeritasHatCrimson: {
    name: "Harvard Veritas Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Veritas-Hat-Quality-200043218.jpg?v=1754063669&width=1220",
  },
  harvardVeritasHatNavy: {
    name: "Harvard Veritas Hat - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardVeritasHat_navy.jpg?v=1754063669&width=1220",
  },
  harvardAthleticShieldHatBlack: {
    name: "Harvard Athletic Shield Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Athletic-Shield-Hat-Quality-200039153.jpg?v=1720625304&width=1220",
  },
  harvardAthleticShieldHatCrimson: {
    name: "Harvard Athletic Shield Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Athletic-Shield-Hat-Quality-200039436.jpg?v=1720625308&width=1220",
  },
  varsityScriptHatWhite: {
    name: "Varsity Script Hat - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Varsity-Script-Hat-Quality-199951895.jpg?v=1720622666&width=1220",
  },
  varsityScriptHatNavy: {
    name: "Varsity Script Hat - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Varsity-Script-Hat-Quality-199952198.jpg?v=1720622663&width=1220",
  },
  classicHHatCrimson: {
    name: "Classic H Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Classic-H-Hat-Quality-199942598.jpg?v=1720622375&width=1220",
  },
  classicHHatIvory: {
    name: "Classic H Hat - Ivory",
    image: "https://www.theharvardshop.com/cdn/shop/files/Classic-H-Hat-Quality-199942136.jpg?v=1720622378&width=1220",
  },
  feltHHatNavy: {
    name: "Felt H Hat - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Felt-H-Hat-Quality-199952698.jpg?v=1720622686&width=1220",
  },
  feltHHatBlack: {
    name: "Felt H Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/Felt-H-Hat-Quality-199952481.jpg?v=1720622682&width=1220",
  },
  h1636HatBlack: {
    name: "H 1636 Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/H-1636-Hat-Quality-199942966.jpg?v=1720622400&width=1220",
  },
  h1636HatCrimson: {
    name: "H 1636 Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/H-1636-Hat-Quality-199943171.jpg?v=1720622402&width=1220",
  },
  harvardEst1636HatCrimson: {
    name: "Harvard Est. 1636 Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardEst.1636Hat_Crimson.jpg?v=1754063374&width=1220",
  },
  harvardEst1636HatNavy: {
    name: "Harvard Est. 1636 Hat - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Est.-1636-Hat-Quality-200038863.jpg?v=1720625299&width=1220",
  },
  harvardKellyCapNavy: {
    name: "Harvard Kelly Cap - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardKellyCap.jpg?v=1754063496&width=1220",
  },
  harvardCorduroyCapWhite: {
    name: "Harvard Corduroy Cap - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardCorduroyCap.jpg?v=1754063231&width=1220",
  },
  product1636ShieldHatBlack: {
    name: "1636 Shield Hat - Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/1636-Shield-Hat-Quality-199951289.jpg?v=1750260720&width=1220",
  },
  hCinchBag: {
    name: "H Cinch Bag",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-05-18at10.47.20AM_730a8825-ace2-454f-932f-9d3f17a385ff.png?v=1779115911&width=1220",
  },
  harvardStrawHatCrimson: {
    name: "Harvard Straw Hat - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Straw-Hat-Logofit-199922674.jpg?v=1720621782&width=1220",
  },
  rectangularHarvardPennantCrimson: {
    name: "Rectangular Harvard Pennant - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Rectangular-Harvard-Pennant-Collegiate-Pacific-199903972.jpg?v=1720621256&width=1220",
  },
  harvard2029FeltBanner: {
    name: "Harvard 2029 Felt Banner",
    image: "https://www.theharvardshop.com/cdn/shop/files/18_62cb312b-0835-4f7d-b121-a9a81e62ba9b.png?v=1742048991&width=1220",
  },
  harvardBabyBlanketCrimson: {
    name: "Harvard Baby Blanket - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/The-Baby-Blanket-Varsity-200076218.jpg?v=1720626437&width=1220",
  },
  harvardStripedRugbyShirtCrimson: {
    name: "Harvard Striped Rugby Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Striped-Rugby-Shirt-Charles-River-200021616.jpg?v=1720624787&width=1220",
  },
  hahvahdTShirtCrimson: {
    name: "Hahvahd T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Hahvahd-T-Shirt-Quality-199897288.jpg?v=1720621054&width=1220",
  },
  millerTee: {
    name: "Miller Tee",
    image: "https://www.theharvardshop.com/cdn/shop/files/Miller-Tee-Latitude-44-199982846.jpg?v=1720623614&width=1220",
  },
  nikeCoreCottonLongSleeveTeeGrey: {
    name: "Nike Core Cotton Long Sleeve Tee - Grey",
    image: "https://www.theharvardshop.com/cdn/shop/files/Nike-Core-Cotton-Long-Sleeve-Tee-Branded-Custom-Sportswear-200040381.jpg?v=1720625345&width=1220",
  },
  harvardBusinessSchoolTeeGray: {
    name: "Harvard Business School Tee - Gray",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Business-School-Shield-T-Shirt-Quality-199980856.jpg?v=1720623542&width=1220",
  },
  harvardBusinessSchoolTeeCrimson: {
    name: "Harvard Business School Tee - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Business-School-Shield-T-Shirt-Quality-199980424.jpg?v=1720623537&width=1220",
  },
  harvardKennedySchoolOfGovernmentTeeCrimson: {
    name: "Harvard Kennedy School of Government Tee - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Kennedy-School-of-Government-Tee-Quality-199977685.jpg?v=1720623461&width=1220",
  },
  harvardKennedySchoolOfGovernmentTeeOxford: {
    name: "Harvard Kennedy School of Government Tee - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Kennedy-School-of-Government-Tee-Quality-199978280.jpg?v=1720623457&width=1220",
  },
  hgseCrestTShirtRed: {
    name: "HGSE Crest T-Shirt - Red",
    image: "https://www.theharvardshop.com/cdn/shop/files/HGSE-Crest-T-Shirt-Quality-199918098.jpg?v=1720621650&width=1220",
  },
  hgseCrestTShirtCrimson: {
    name: "HGSE Crest T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/HGSE-Crest-T-Shirt-Quality-199917510.jpg?v=1720621653&width=1220",
  },
  harvardGraduateSchoolOfEducationTriblendTShirtNavy: {
    name: "Harvard Graduate School of Education Triblend T-shirt - Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Triblend-T-shirt-Quality-199972721.jpg?v=1720623317&width=1220",
  },
  harvardGraduateSchoolOfEducationTriblendTShirtCrimson: {
    name: "Harvard Graduate School of Education Triblend T-shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Triblend-T-shirt-Quality-199973245.jpg?v=1720623304&width=1220",
  },
  harvardGraduateSchoolOfEducationLongSleeveTShirtCrimson: {
    name: "Harvard Graduate School of Education Long Sleeve T-Shirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Long-Sleeve-T-Shirt-Quality-199948026.jpg?v=1720622551&width=1220",
  },
  harvardGraduateSchoolOfEducationHoodedSweatshirtCrimson: {
    name: "Harvard Graduate School of Education Hooded Sweatshirt - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Hooded-Sweatshirt-Quality-200001447.jpg?v=1720624167&width=1220",
  },
  newHarvardLawSchoolShirtGray: {
    name: "New Harvard Law School Shirt - Gray",
    image: "https://www.theharvardshop.com/cdn/shop/files/New-Harvard-Law-School-Shirt-Quality-200032630.jpg?v=1720625114&width=1220",
  },
  harvardMedicalSchoolPen: {
    name: "Harvard Medical School Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Medical-School-Pen-Quality-200030321.jpg?v=1720625042&width=1220",
  },
  harvardLawSchoolPen: {
    name: "Harvard Law School Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Law-School-Pen-Quality-200030133.jpg?v=1720625035&width=1220",
  },
  harvardGraduateSchoolOfEducationPen: {
    name: "Harvard Graduate School of Education Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Pen-Quality-200029951.jpg?v=1720625030&width=1220",
  },
  harvardKennedySchoolPen: {
    name: "Harvard Kennedy School Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Kennedy-School-Pen-Quality-200029745.jpg?v=1720625023&width=1220",
  },
  harvardBusinessSchoolPen: {
    name: "Harvard Business School Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Business-School-Pen-Quality-200028118.jpg?v=1720624972&width=1220",
  },
  harvardGraduateSchoolOfEducationMugWhite: {
    name: "Harvard Graduate School of Education Mug - White",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Graduate-School-of-Education-Mug-Quality-199963931.jpg?v=1720623036&width=1220",
  },
  harvardKennedySchoolMug: {
    name: "Harvard Kennedy School Mug",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Kennedy-School-Mug-Quality-199981360.jpg?v=1720623564&width=1220",
  },
  classicHarvardBusinessSchoolMug: {
    name: "Classic Harvard Business School Mug",
    image: "https://www.theharvardshop.com/cdn/shop/files/Classic-Harvard-Business-School-Mug-Quality-200007845.jpg?v=1720624362&width=1220",
  },
  harvardLawSchoolMug: {
    name: "Harvard Law School Mug",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Law-School-Mug-Quality-200063862.jpg?v=1720626053&width=1220",
  },
  harvardMedicalSchoolMug: {
    name: "Harvard Medical School Mug",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Medical-School-Mug-Quality-200008012.jpg?v=1720624367&width=1220",
  },
  harvardMomTShirtCrimson: {
    name: "Harvard Mom T-Shirt Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/Harvard-Mom-T-Shirt-Quality-199940895.jpg?v=1720622340&width=1220",
  },
  engravedColorHarvardKeychainSilver: {
    name: "Engraved Color Harvard Keychain Silver",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-01at3.36.06PM.png?v=1775072185&width=1220",
  },
  harvardWeatheredFleeceShortsNavy: {
    name: "Harvard Weathered Fleece Shorts Navy",
    image: "https://www.theharvardshop.com/cdn/shop/files/18_f2f8eaab-471e-416c-9d7e-26d0e37e7a87.png?v=1739227374&width=1220",
  },
  harvard1991VarsityJacketBlack: {
    name: "Harvard 1991 Varsity Jacket Black",
    image: "https://www.theharvardshop.com/cdn/shop/files/1991VarsityJacket.jpg?v=1754062989&width=1220",
  },
  harvardCampusMagnet: {
    name: "Harvard Campus Magnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/ImagefromiOS_3.jpg?v=1753987173&width=1220",
  },
  harvardChampionCuffedSweatpantsGrey: {
    name: "Harvard Champion Cuffed Sweatpants Grey",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardChampionCuffedSweatpants.jpg?v=1754063127&width=1220",
  },
  acrylicHShieldMagnet: {
    name: "Acrylic H Shield Magnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-05-18at10.01.56AM_eaa656d3-205e-4515-a60d-96f9fd927100.png?v=1779112979&width=1220",
  },
  harvardWeeksBridgePostcard: {
    name: "Harvard Weeks Bridge Postcard",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-01-07at1.58.42PM.png?v=1767812336&width=1220",
  },
  harvardGraduateSchoolOfEducationPin: {
    name: "Harvard Graduate School of Education Pin",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardGraduateSchoolofEducationPin.jpg?v=1754063429&width=1220",
  },
  johnstonGatePostcard: {
    name: "Johnston Gate Postcard",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2025-12-12at1.42.34PM.png?v=1765565016&width=1220",
  },
  johnHarvardStatuePostcard: {
    name: "John Harvard Statue Postcard",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2025-12-12at1.42.23PM.png?v=1765565043&width=1220",
  },
  harvardSquareWoodMagnet: {
    name: "Harvard Square Wood Magnet",
    image: "https://www.theharvardshop.com/cdn/shop/files/HarvardSquareWoodMagnet.jpg?v=1754063582&width=1220",
  },
  juniorAllStarJacket: {
    name: "Junior All-Star Jacket",
    image: "https://www.theharvardshop.com/cdn/shop/files/Untitled_design_15_476d25f9-75fc-4006-ab12-0a11ac18c57b.png?v=1757958158&width=1220",
  },
  harvardCampusToteBag: {
    name: "Harvard Campus Tote Bag",
    image: "https://www.theharvardshop.com/cdn/shop/files/1000x1000_26.jpg?v=1752506420&width=1220",
  },
  whiteMitPen: {
    name: "White MIT Pen",
    image: "https://www.theharvardshop.com/cdn/shop/files/White-MIT-Pen-Quality-199936897.jpg?v=1720622217&width=1220",
  },
  mitLanyard: {
    name: "MIT Lanyard",
    image: "https://www.theharvardshop.com/cdn/shop/files/MIT-Lanyard-Quality-199935556.jpg?v=1720622173&width=1220",
  },
  mitHoodedSweatshirtCrimson: {
    name: "MIT Hooded Sweatshirt Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/MIT-Hooded-Sweatshirt-Freedom-199935059.jpg?v=1720622150&width=1220",
  },
  mitTShirtOxford: {
    name: "MIT T-Shirt Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/MIT-T-Shirt-Freedom-199935672.jpg?v=1720622177&width=1220",
  },
  theMitSweaterCream: {
    name: "The MIT Sweater - Cream",
    image: "https://www.theharvardshop.com/cdn/shop/files/MITSweater_Cream.jpg?v=1754063710&width=1220",
  },
  rugbyStripeScarf: {
    name: "Rugby Stripe Scarf",
    image: "https://www.theharvardshop.com/cdn/shop/files/FlatLays1005.png?v=1750260079&width=1220",
  },
  simpleHFaceDecalStickerSheet: {
    name: "Simple H Face Decal Sticker Sheet",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-05-19at4.17.12PM_525cf374-6e0f-4a35-bc34-37afb0c37033.png?v=1779221856&width=1220",
  },
  harvardCrimsonChristmasOrnamentLimitedEdition: {
    name: "Harvard Crimson Christmas Ornament (Limited Edition)",
    image: "https://www.theharvardshop.com/cdn/shop/files/17441.jpg?v=1763522176&width=1220",
  },
  johnHarvardStatueKeychain: {
    name: "John Harvard Statue Keychain",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2025-09-07at2.54.09PM.png?v=1757271258&width=1220",
  },
  widenerLibraryKeychain: {
    name: "Widener Library Keychain",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2025-09-07at3.03.23PM.png?v=1757271839&width=1220",
  },
  harvardStampKeychain: {
    name: "Harvard Stamp Keychain",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2025-09-07at2.58.54PM.png?v=1757271575&width=1220",
  },
  harvardPomBeanieRose: {
    name: "Harvard Pom Beanie - Rose",
    image: "https://www.theharvardshop.com/cdn/shop/files/26.png?v=1739228024&width=1220",
  },
  harvardPomBeanieOxford: {
    name: "Harvard Pom Beanie - Oxford",
    image: "https://www.theharvardshop.com/cdn/shop/files/FlatLays1005_13.png?v=1730779105&width=1220",
  },
  classicDianaMockNeckSteelGrey: {
    name: "Classic Diana Mock Neck - Steel Grey",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot_2026-05-21_at_9.09.05_AM.png?v=1779368960&width=1220",
  },
  harvard2030FeltBanner: {
    name: "Harvard 2030 Felt Banner",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot2026-04-16at3.10.51PM.png?v=1776366666&width=1220",
  },
  theHarvardVintageArcSweaterCrimson: {
    name: "The Harvard Vintage Arc Sweater - Crimson",
    image: "https://www.theharvardshop.com/cdn/shop/files/FullBody-HarvardArched_107Base100Felt.jpg?v=1776366388&width=1220",
  },
  theHarvardVintageArcSweaterCream: {
    name: "The Harvard Vintage Arc Sweater - Cream",
    image: "https://www.theharvardshop.com/cdn/shop/files/FullBody-HarvardArched_100Base107Felt.jpg?v=1776366388&width=1220",
  },
  harvardGolfBallSet: {
    name: "Harvard Golf Ball Set",
    image: "https://www.theharvardshop.com/cdn/shop/files/Screenshot_2026-03-29_at_4.57.38_PM.png?v=1779566682&width=1220",
  },
};
function WindowSegment({ start, end, height = 3.2 }) {
  const [x1, z1] = start;
  const [x2, z2] = end;

  const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const rotation = -Math.atan2(z2 - z1, x2 - x1);

  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[length, height, 0.08]} />
        <meshStandardMaterial
          color="#bfe7ff"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, height + 0.05, 0]}>
        <boxGeometry args={[length, 0.12, 0.16]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[length, 0.12, 0.16]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {[-0.33, 0, 0.33].map((p) => (
        <mesh key={p} position={[length * p, height / 2, 0]}>
          <boxGeometry args={[0.06, height, 0.16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
}
function DoubleDoor({ x, z, rotation = 0 }) {
  const [open, setOpen] = useState(false);
  const leftRotation = open ? Math.PI / 2.4 : 0;
  const rightRotation = open ? -Math.PI / 2.4 : 0;

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, rotation, 0]}
      onClick={(event) => {
        event.stopPropagation();
        setOpen((current) => !current);
      }}
    >
      <group position={[-0.45, 0, 0]} rotation={[0, leftRotation, 0]}>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[0.85, 2.3, 0.08]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <mesh position={[0, 1.15, 0.04]}>
          <boxGeometry args={[0.72, 1.9, 0.04]} />
          <meshStandardMaterial color="#bfe7ff" transparent opacity={0.45} />
        </mesh>

        <mesh position={[0.34, 1.05, 0.12]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#c8a24a" />
        </mesh>
      </group>

      <group position={[0.45, 0, 0]} rotation={[0, rightRotation, 0]}>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[0.85, 2.3, 0.08]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <mesh position={[0, 1.15, 0.04]}>
          <boxGeometry args={[0.72, 1.9, 0.04]} />
          <meshStandardMaterial color="#bfe7ff" transparent opacity={0.45} />
        </mesh>

        <mesh position={[-0.34, 1.05, 0.12]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#c8a24a" />
        </mesh>
      </group>
    </group>
  );
}
const rackTypes = {
  fourWay: { label: "Four-Way Rack", slots: 4 },
  horizontal: { label: "Horizontal Rack", slots: 5 },
  threeWay: { label: "Family / Six-Hook Rack", slots: 6 },
  table: { label: "Display Table", slots: 4 },
  wallHook: { label: "Wall Hook Rack", slots: 2 },
  desk: { label: "POS Desk", slots: 3 },
};

function getSlotCount(type) {
  return rackTypes[type]?.slots || 4;
}

function makeEmptyProducts(type) {
  return Array(getSlotCount(type)).fill(null);
}

function ProductCard({
  productId,
  productCatalog,
  x = 0,
  y = 1.2,
  z = 0,
  scale = 1,
  rotation = [0, 0, 0],
}) {
  if (!productId) return null;

  const product = productCatalog?.[productId];
  const fallbackImage = catalog.harvardArcTeeCrimson.image;
  const texture = useLoader(TextureLoader, product?.image || fallbackImage);

  return (
    <group position={[x, y, z]} scale={scale} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.5, 0.65, 0.04]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

function WallSegment({ start, end, height = 3.5 }) {
  const [x1, z1] = start;
  const [x2, z2] = end;

  const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const rotation = -Math.atan2(z2 - z1, x2 - x1);

  return (
    <mesh position={[x, height / 2, z]} rotation={[0, rotation, 0]}>
      <boxGeometry args={[length, height, 0.25]} />
      <meshStandardMaterial color="#f5f5f5" />
    </mesh>
  );
}

function FourWayRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;
  const arms = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {arms.map((r, i) => (
        <group key={i} rotation={[0, r, 0]}>
          <mesh position={[0.55, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 1.1]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <ProductCard
            productId={fixture.products[i] || null}
            productCatalog={productCatalog}
            x={0.55}
            y={1.15}
            z={0}
          />
        </group>
      ))}

      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#cfcfcf"} />
      </mesh>
    </group>
  );
}
function POSDesk({ fixture, selectedId, setSelectedId }) {
  const selected = selectedId === fixture.id;

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      {/* long wood counter */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[3.8, 1.1, 0.85]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#c49a6c"} />
      </mesh>

      {/* dark countertop */}
      <mesh position={[0, 1.13, 0]}>
        <boxGeometry args={[3.95, 0.08, 0.95]} />
        <meshStandardMaterial color="#3b3b3b" />
      </mesh>

      {/* crimson front panel */}
      <mesh position={[0, 0.72, 0.46]}>
        <boxGeometry args={[1.25, 0.75, 0.06]} />
        <meshStandardMaterial color="#8c1d40" />
      </mesh>

      {/* left register */}
      <mesh position={[-1.15, 1.32, 0.05]}>
        <boxGeometry args={[0.45, 0.35, 0.08]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      <mesh position={[-1.15, 1.52, -0.08]}>
        <boxGeometry args={[0.5, 0.32, 0.06]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>

      {/* right register */}
      <mesh position={[1.15, 1.32, 0.05]}>
        <boxGeometry args={[0.45, 0.35, 0.08]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      <mesh position={[1.15, 1.52, -0.08]}>
        <boxGeometry args={[0.5, 0.32, 0.06]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>
    </group>
  );
}
function DisplayTable({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.15]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#8b5a2b"} />
      </mesh>

      {fixture.products.slice(0, 4).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          productCatalog={productCatalog}
          x={-0.75 + i * 0.5}
          y={0.83}
          z={0}
          scale={0.65}
        />
      ))}
    </group>
  );
}

function HorizontalRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#777"} />
      </mesh>

      <mesh position={[-1.15, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[1.15, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#cfcfcf" />
      </mesh>

      {fixture.products.slice(0, 5).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          productCatalog={productCatalog}
          x={-0.75 + i * 0.75}
          y={1.15}
          z={0.15}
          scale={0.8}
        />
      ))}
    </group>
  );
}

function WallHookRack({
  fixture,
  selectedId,
  setSelectedId,
  productCatalog,
  x,
  z,
  rotation = 0,
  product,
}) {
  const isFixture = !!fixture;
  const selected = fixture && selectedId === fixture.id;

  const rackX = fixture ? fixture.x : x;
  const rackZ = fixture ? fixture.z : z;
  const rackRotation = fixture ? fixture.rotation : rotation;
  const products = fixture ? fixture.products || [] : [product, product];

  return (
    <group
      position={[rackX, 0, rackZ]}
      rotation={[0, rackRotation, 0]}
      onClick={(e) => {
        if (!isFixture) return;
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 1.8, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#9ca3af"} />
      </mesh>

      <mesh position={[0, 1.0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#9ca3af"} />
      </mesh>

      <ProductCard
        productId={products[0]}
        productCatalog={productCatalog}
        x={0}
        y={1.55}
        z={0.65}
        scale={0.75}
      />

      <ProductCard
        productId={products[1]}
        productCatalog={productCatalog}
        x={0}
        y={0.75}
        z={0.65}
        scale={0.75}
      />
    </group>
  );
}
function ThreeWayRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;
  const products = fixture.products || [];
  const hookPositions = [-0.6, 0, 0.6];

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      {/* base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.6]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#cfcfcf"} />
      </mesh>

      {/* two legs */}
      <mesh position={[-0.9, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[0.9, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* main horizontal bar */}
      <mesh position={[0, 1.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.0]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* 3 hooks on the front and 3 hooks on the back */}
      {hookPositions.map((x, i) => (
        <React.Fragment key={x}>
          <mesh position={[x, 1.45, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <mesh position={[x, 1.45, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <ProductCard
            productId={products[i]}
            productCatalog={productCatalog}
            x={x}
            y={1.1}
            z={0.7}
            scale={0.75}
          />

          <ProductCard
            productId={products[i + 3]}
            productCatalog={productCatalog}
            x={x}
            y={1.1}
            z={-0.7}
            scale={0.75}
            rotation={[0, Math.PI, 0]}
          />
        </React.Fragment>
      ))}
    </group>
  );
}

const startingFixtures = [
  {
    id: "Rack 1",
    type: "fourWay",
    x: -5.7,
    z: -2.7,
    rotation: 0.8,
    products: [
      "harvardArcTeeCrimson",
      "harvardArcTeeOxford",
      "harvardArcTeeBlack",
      "harvardArcTeeWhite",
    ],
  },
  {
    id: "Rack 2",
    type: "fourWay",
    x: 1.1,
    z: -3.2,
    rotation: 0.8,
    products: [
      "crestHoodCrimson",
      "crestHoodNavy",
      "crestHoodOxford",
      "proWeaveHoodOatmeal",
    ],
  },
  {
    id: "Rack 3",
    type: "fourWay",
    x: 2.4,
    z: -1.0,
    rotation: 0.8,
    products: [
      "benchmarkCrewNavy",
      "benchmarkCrewRed",
      "benchmarkCrewOxford",
      "proWeaveCrewBlack",
    ],
  },
  {
    id: "Rack 4",
    type: "fourWay",
    x: 4.9,
    z: 0.2,
    rotation: 0.8,
    products: [
      "crestTeeOxford",
      "crestTeeNavy",
      "crestTeeWhite",
      "harvardArcTeeCrimson",
    ],
  },
  {
    id: "Rack 5",
    type: "fourWay",
    x: -6.1,
    z: 4.0,
    rotation: 0.8,
    products: [
      "benchmarkCrewNavy",
      "benchmarkCrewRed",
      "benchmarkCrewOxford",
      "proWeaveCrewOxford",
    ],
  },
  {
    id: "Rack 6",
    type: "fourWay",
    x: 0.6,
    z: 4.3,
    rotation: 0.8,
    products: [
      "harvardArcTeeCrimson",
      "crestTeeOxford",
      "crestTeeNavy",
      "crestTeeWhite",
    ],
  },
  {
    id: "Rack 7",
    type: "fourWay",
    x: 3.8,
    z: 3.7,
    rotation: 0.8,
    products: [
      "crestHoodCrimson",
      "crestHoodNavy",
      "proWeaveHoodCrimson",
      "proWeaveHoodOatmeal",
    ],
  },
  {
    id: "Horizontal Rack 1",
    type: "horizontal",
    x: 0.7,
    z: -4.0,
    rotation: 0.45,
    products: [
      "crestHoodCrimson",
      "crestHoodNavy",
      "crestHoodOxford",
      "proWeaveHoodCrimson",
    ],
  },
  {
    id: "Family Tee Rack",
    type: "threeWay",
    x: -2.2,
    z: -3.7,
    rotation: 0.45,
    products: [
      "brotherTee",
      "sisterTee",
      "grandmaTee",
      "grandpaTee",
      "momTee",
      "dadTee",
    ],
  },
  {
    id: "Table 1",
    type: "table",
    x: -6.1,
    z: 0.5,
    rotation: 0,
    products: [
      "harvardArcTeeCrimson",
      "harvardArcTeeOxford",
      "harvardArcTeeBlack",
      "harvardArcTeeWhite",
    ],
  },
  {
    id: "Table 2",
    type: "table",
    x: -1.2,
    z: 1.2,
    rotation: 0.45,
    products: [
      "benchmarkCrewNavy",
      "benchmarkCrewRed",
      "benchmarkCrewOxford",
      "proWeaveCrewOxford",
    ],
  },
];


const storeOptions = [
  { id: "massAve", name: "Mass Ave" },
  { id: "mtAuburn", name: "Mt. Auburn" },
  { id: "jfk", name: "JFK" },
];

const wallsByStore = {
  massAve: [
    [[-8.5, -7.5], [1.5, -7.5]],
    [[1.5, -7.5], [7.4, -1.8]],
    [[7.4, -1.8], [8.7, 1.8]],
    [[8.7, 1.8], [5.8, 5.3]],
    [[-8.5, 7.5], [-8.5, -7.5]],
  ],

  // Traced from the 65 Mt. Auburn existing plan PDF.
  // It is intentionally simplified into wall segments so the editor remains easy to use.
  mtAuburn: [
    // Upper-left storage block
    [[-8.3, -8.4], [-2.9, -8.4]],
    [[-8.3, -8.4], [-8.3, -4.9]],
    [[-8.3, -4.9], [-7.6, -4.9]],
    [[-7.6, -4.9], [-7.6, -2.1]],
    [[-7.6, -2.1], [-8.0, -2.1]],
    [[-8.0, -2.1], [-8.0, 0.7]],
    [[-8.0, 0.7], [-6.7, 0.7]],
    [[-6.7, 0.7], [-6.2, 1.5]],
    [[-6.2, 1.5], [-5.3, 1.5]],
    [[-5.3, 1.5], [-4.7, 2.0]],
    [[-4.7, 2.0], [-3.0, 2.0]],
    [[-3.0, 2.0], [-2.9, -8.4]],

    // Upper-middle storage room
    [[-2.9, -7.8], [-0.5, -7.8]],
    [[-0.5, -7.8], [-0.5, -6.8]],
    [[-0.5, -6.8], [0.1, -6.8]],
    [[0.1, -6.8], [0.1, -5.4]],
    [[0.1, -5.4], [-2.9, -5.4]],

    // Main long retail room
    [[0.1, -8.0], [4.9, -8.0]],
    [[4.9, -8.0], [4.9, 9.1]],
    [[4.9, 9.1], [3.0, 9.1]],
    [[3.0, 9.1], [3.0, 8.2]],
    [[3.0, 8.2], [1.2, 8.2]],
    [[1.2, 8.2], [1.2, 9.1]],
    [[1.2, 9.1], [-0.4, 9.1]],
    [[-0.4, 9.1], [-0.4, 4.6]],
    [[-0.4, 4.6], [-1.0, 4.6]],
    [[-1.0, 4.6], [-1.0, 2.0]],
    [[-1.0, 2.0], [-2.9, 2.0]],

    // Restroom / fitting-room support space along the left side of the sales floor
    [[-1.0, -2.6], [0.6, -2.6]],
    [[0.6, -2.6], [0.6, 0.2]],
    [[0.6, 0.2], [-0.4, 0.2]],
    [[-0.4, 0.2], [-0.4, -1.0]],
    [[-0.4, -1.0], [-1.0, -1.0]],
  ],

  jfk: [
    [[-7.5, -7.5], [7.5, -7.5]],
    [[7.5, -7.5], [7.5, 7.5]],
    [[7.5, 7.5], [-7.5, 7.5]],
    [[-7.5, 7.5], [-7.5, -7.5]],
  ],
};

const floorSizesByStore = {
  massAve: [22, 20],
  mtAuburn: [18, 22],
  jfk: [18, 18],
};

const wallHooksByStore = {
  massAve: [
    { x: -7.2, z: -7.25, rotation: 0, product: "harvardArcTeeCrimson" },
    { x: -5.7, z: -7.25, rotation: 0, product: "harvardArcTeeOxford" },
    { x: -4.3, z: -7.25, rotation: 0, product: "harvardArcTeeBlack" },
    { x: -3.0, z: -7.25, rotation: 0, product: "harvardArcTeeWhite" },
    { x: -1.7, z: -7.25, rotation: 0, product: "crestTeeOxford" },
  ],
  mtAuburn: [],
  jfk: [],
};

const startingFixturesByStore = {
  massAve: startingFixtures,
  mtAuburn: [],
  jfk: [],
};

function cloneFixtures(fixtures) {
  return fixtures.map((fixture) => ({
    ...fixture,
    products: [...(fixture.products || [])],
  }));
}

function getStoredLayoutKey(storeId) {
  return `storeLayout-${storeId}`;
}

function getDefaultFixturesForStore(storeId) {
  return cloneFixtures(startingFixturesByStore[storeId] || []);
}
function WoodFloor({ size = [22, 20] }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#a8753b" roughness={0.65} />
    </mesh>
  );
}
function FirstPersonWalkControls({ enabled, startPosition = [0, 1.6, 6] }) {
  const { camera } = useThree();
  const [keys, setKeys] = useState({});
  const direction = new Vector3();
  const sideDirection = new Vector3();

  useEffect(() => {
    if (!enabled) return;

    camera.position.set(startPosition[0], startPosition[1], startPosition[2]);

    function handleKeyDown(event) {
      setKeys((current) => ({ ...current, [event.code]: true }));
    }

    function handleKeyUp(event) {
      setKeys((current) => ({ ...current, [event.code]: false }));
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enabled, camera, startPosition]);

  useFrame((_, delta) => {
    if (!enabled) return;

    const speed = keys.ShiftLeft || keys.ShiftRight ? 5 : 2.4;

    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    sideDirection.crossVectors(camera.up, direction).normalize();

    if (keys.KeyW) camera.position.addScaledVector(direction, speed * delta);
    if (keys.KeyS) camera.position.addScaledVector(direction, -speed * delta);
    if (keys.KeyA) camera.position.addScaledVector(sideDirection, speed * delta);
    if (keys.KeyD) camera.position.addScaledVector(sideDirection, -speed * delta);

    camera.position.y = startPosition[1];
  });

  return null;
}

function WalkableFloor({ size, onDropIn }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onDropIn([event.point.x, 1.6, event.point.z]);
      }}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}
export default function App() {
  const [activeStoreId, setActiveStoreId] = useState("massAve");
  const [fixtures, setFixtures] = useState(() => getDefaultFixturesForStore("massAve"));
  const [selectedId, setSelectedId] = useState("Rack 1");
  const [customProducts, setCustomProducts] = useState({});
  const [newRackType, setNewRackType] = useState("fourWay");
  const [newProductName, setNewProductName] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [walkMode, setWalkMode] = useState(false);
  const [walkStartPosition, setWalkStartPosition] = useState([0, 1.6, 6]);

  const productCatalog = { ...catalog, ...customProducts };
  const productOptions = Object.entries(productCatalog).map(([id, product]) => ({
    id,
    name: product.name || id,
  }));

  useEffect(() => {
    const savedProducts = window.localStorage.getItem("storeProducts");

    if (savedProducts) {
      setCustomProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    const legacyMassAveLayout =
      activeStoreId === "massAve" ? window.localStorage.getItem("storeLayout") : null;
    const savedLayout =
      window.localStorage.getItem(getStoredLayoutKey(activeStoreId)) || legacyMassAveLayout;
    const nextFixtures = savedLayout
      ? JSON.parse(savedLayout)
      : getDefaultFixturesForStore(activeStoreId);

    setFixtures(nextFixtures);
    setSelectedId(nextFixtures[0]?.id || "");
  }, [activeStoreId]);

  useEffect(() => {
    window.localStorage.setItem(getStoredLayoutKey(activeStoreId), JSON.stringify(fixtures));
  }, [activeStoreId, fixtures]);

  useEffect(() => {
    window.localStorage.setItem("storeProducts", JSON.stringify(customProducts));
  }, [customProducts]);

  const selectedFixture = fixtures.find((f) => f.id === selectedId);

  function moveSelected(dx, dz) {
    if (!selectedId) return;

    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, x: f.x + dx, z: f.z + dz } : f
      )
    );
  }

  function rotateSelected(amount) {
    if (!selectedId) return;

    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, rotation: f.rotation + amount } : f
      )
    );
  }

  function addRack() {
    const countOfType = fixtures.filter((f) => f.type === newRackType).length + 1;
    const newFixture = {
      id: `${rackTypes[newRackType].label} ${countOfType}`,
      type: newRackType,
      x: 0,
      z: 0,
      rotation: 0,
      products: makeEmptyProducts(newRackType),
    };

    setFixtures((current) => [...current, newFixture]);
    setSelectedId(newFixture.id);
  }

  function addProduct() {
    const trimmedName = newProductName.trim();
    const trimmedImage = newProductImage.trim();

    if (!trimmedName || !trimmedImage) {
      alert("Add a product name and image link first.");
      return;
    }

    const id = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + `-${Date.now()}`;

    setCustomProducts((current) => ({
      ...current,
      [id]: { name: trimmedName, image: trimmedImage },
    }));

    setNewProductName("");
    setNewProductImage("");
  }

  function assignProductToSlot(slotIndex, productId) {
    setFixtures((current) =>
      current.map((fixture) => {
        if (fixture.id !== selectedId) return fixture;

        const slotCount = getSlotCount(fixture.type);
        const nextProducts = [...(fixture.products || makeEmptyProducts(fixture.type))];

        while (nextProducts.length < slotCount) {
          nextProducts.push(null);
        }

        nextProducts[slotIndex] = productId || null;

        return {
          ...fixture,
          products: nextProducts.slice(0, slotCount),
        };
      })
    );
  }

  function deleteSelectedFixture() {
    if (!selectedFixture) return;

    setFixtures((current) => current.filter((f) => f.id !== selectedId));
    setSelectedId(fixtures.find((f) => f.id !== selectedId)?.id || "");
  }

  function resetLayout() {
    localStorage.removeItem(getStoredLayoutKey(activeStoreId));
    if (activeStoreId === "massAve") {
      localStorage.removeItem("storeLayout");
    }

    const defaultFixtures = getDefaultFixturesForStore(activeStoreId);
    setFixtures(defaultFixtures);
    setSelectedId(defaultFixtures[0]?.id || "");
  }

  const activeStore = storeOptions.find((store) => store.id === activeStoreId);
  const activeWalls = wallsByStore[activeStoreId] || [];
  const activeFloorSize = floorSizesByStore[activeStoreId] || [22, 20];
  const activeWallHooks = wallHooksByStore[activeStoreId] || [];

  const buttonStyle = {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #d8d3cc",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    border: "1px solid #d8d3cc",
    boxSizing: "border-box",
  };

  const sectionTitleStyle = {
    margin: "0 0 8px",
    fontSize: 15,
    color: "#3b2f2f",
    letterSpacing: "0.01em",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #f7f3ee 0%, #ece3dc 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(120, 72, 72, 0.14)",
          padding: "12px 16px",
          borderRadius: 20,
          boxShadow: "0 14px 40px rgba(69, 32, 32, 0.14)",
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#7f6b5f", fontWeight: 700 }}>
            Harvard Shop Store Layout Editor
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#241515" }}>
            {activeStore?.name}
          </div>
          <div style={{ fontSize: 11, color: "#8a7468", fontWeight: 700 }}>
            {activeStoreId === "mtAuburn" ? "Floor plan traced from 65 Mt. Auburn PDF" : "Interactive fixture planner"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {storeOptions.map((store) => {
            const active = activeStoreId === store.id;

            return (
              <button
                key={store.id}
                onClick={() => setActiveStoreId(store.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: active ? "1px solid #7f1d1d" : "1px solid #d8d3cc",
                  background: active ? "#7f1d1d" : "white",
                  color: active ? "white" : "#3b2f2f",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                {store.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 16,
          zIndex: 10,
          background: "rgba(255,255,255,0.95)",
          padding: 16,
          borderRadius: 20,
          border: "1px solid rgba(120, 72, 72, 0.14)",
          boxShadow: "0 14px 40px rgba(69, 32, 32, 0.14)",
          width: 340,
          maxHeight: "calc(100vh - 112px)",
          overflowY: "auto",
        }}
      >
        <h3 style={sectionTitleStyle}>Move Fixtures</h3>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{ ...inputStyle, marginBottom: 12 }}
        >
          {fixtures.length === 0 && <option value="">No fixtures yet</option>}
          {fixtures.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>

        <div style={{ fontSize: 13, marginBottom: 10 }}>
          <b>Selected:</b> {selectedFixture?.id}
          <br />
          x: {selectedFixture?.x.toFixed(1)} | z: {selectedFixture?.z.toFixed(1)} | rot:{" "}
          {selectedFixture?.rotation.toFixed(2)}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span></span>
          <button style={buttonStyle} onClick={() => moveSelected(0, -0.2)}>
            ↑
          </button>
          <span></span>

          <button style={buttonStyle} onClick={() => moveSelected(-0.2, 0)}>
            ←
          </button>
          <button style={buttonStyle} onClick={() => moveSelected(0, 0.2)}>
            ↓
          </button>
          <button style={buttonStyle} onClick={() => moveSelected(0.2, 0)}>
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button style={buttonStyle} onClick={() => rotateSelected(-0.15)}>
            Rotate -
          </button>
          <button style={buttonStyle} onClick={() => rotateSelected(0.15)}>
            Rotate +
          </button>
        </div>

        <button style={{ ...buttonStyle, width: "100%" }} onClick={resetLayout}>
          Reset Layout
        </button>

        <button
          style={{ ...buttonStyle, width: "100%", marginTop: 10 }}
          onClick={() => {
            window.localStorage.setItem(getStoredLayoutKey(activeStoreId), JSON.stringify(fixtures));
            window.localStorage.setItem("storeProducts", JSON.stringify(customProducts));
            alert("Layout saved!");
          }}
        >
          Save Layout
        </button>

        <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

        <h3 style={sectionTitleStyle}>Add Rack</h3>
        <select
          value={newRackType}
          onChange={(e) => setNewRackType(e.target.value)}
          style={inputStyle}
        >
          {Object.entries(rackTypes).map(([type, rack]) => (
            <option key={type} value={type}>
              {rack.label}
            </option>
          ))}
        </select>
        <button style={{ ...buttonStyle, width: "100%" }} onClick={addRack}>
          Add Selected Rack
        </button>

        <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

        <h3 style={sectionTitleStyle}>Add Product</h3>
        <input
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product name"
          style={inputStyle}
        />
        <input
          value={newProductImage}
          onChange={(e) => setNewProductImage(e.target.value)}
          placeholder="Product image link"
          style={inputStyle}
        />
        <button style={{ ...buttonStyle, width: "100%" }} onClick={addProduct}>
          Add Product
        </button>

        {selectedFixture && (
          <>
            <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

            <h3 style={sectionTitleStyle}>Products on Selected Rack</h3>
            {Array.from({ length: getSlotCount(selectedFixture.type) }).map((_, slotIndex) => (
              <select
                key={slotIndex}
                value={selectedFixture.products?.[slotIndex] || ""}
                onChange={(e) => assignProductToSlot(slotIndex, e.target.value)}
                style={{ ...inputStyle, padding: 8, marginBottom: 6 }}
              >
                <option value="">Slot {slotIndex + 1}: Empty</option>
                {productOptions.map((product) => (
                  <option key={product.id} value={product.id}>
                    Slot {slotIndex + 1}: {product.name}
                  </option>
                ))}
              </select>
            ))}

            <button
              style={{ ...buttonStyle, width: "100%", marginTop: 8 }}
              onClick={deleteSelectedFixture}
            >
              Delete Selected Rack
            </button>
          </>
        )}

      </div>

      <button
        onClick={() => {
          setWalkStartPosition([0, 1.6, 6]);
          setWalkMode((current) => !current);
        }}
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          zIndex: 30,
          padding: "12px 16px",
          borderRadius: 999,
          border: "1px solid #d8d3cc",
          background: walkMode ? "#7f1d1d" : "white",
          color: walkMode ? "white" : "#3b2f2f",
          fontWeight: 900,
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
        }}
      >
        {walkMode ? "Exit Walk Mode" : "Enter Walk Mode"}
      </button>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          zIndex: 30,
          padding: "10px 14px",
          borderRadius: 999,
          background: "rgba(36, 21, 21, 0.86)",
          color: "white",
          fontSize: 13,
          fontWeight: 700,
          pointerEvents: "none",
        }}
      >
        {walkMode
          ? "WASD to walk - Mouse to look - Shift to run - Esc or button to exit"
          : "Double-click the floor to drop into the store - Drag to orbit"}
      </div>

      <Canvas camera={{ position: [18, 18, 18], fov: 55 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

        {walkMode ? (
          <>
            <PointerLockControls />
            <FirstPersonWalkControls
              enabled={walkMode}
              startPosition={walkStartPosition}
            />
          </>
        ) : (
          <OrbitControls enablePan enableZoom enableRotate />
        )}

        <WoodFloor size={activeFloorSize} />
        <WalkableFloor
          size={activeFloorSize}
          onDropIn={(position) => {
            setWalkStartPosition(position);
            setWalkMode(true);
          }}
        />

        {activeWalls.map(([start, end], index) => (
      <WallSegment key={`${activeStoreId}-wall-${index}`} start={start} end={end} />
    ))}
    
    {activeStoreId === "massAve" && (
      <>
        <WindowSegment start={[-8.5, 7.5]} end={[-3.2, 7.5]} />
        <WindowSegment start={[-1.1, 7.5]} end={[0.8, 7.5]} />
        <WindowSegment start={[0.8, 7.5]} end={[5.8, 5.3]} />
        <DoubleDoor x={-2.15} z={7.5} rotation={0} />
      </>
    )}

        {fixtures.map((fixture) => {
          if (fixture.type === "fourWay") {
            return (
              <FourWayRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "horizontal") {
            return (
              <HorizontalRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "threeWay") {
            return (
              <ThreeWayRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "wallHook") {
            return (
              <WallHookRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }
          if (fixture.type === "table") {
            return (
              <DisplayTable
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }
          if (fixture.type === "desk") {
            return (
              <POSDesk
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            );
          }
          return null;
        })}

        {activeWallHooks.map((hook, index) => (
          <WallHookRack
            key={`${activeStoreId}-wall-hook-${index}`}
            x={hook.x}
            z={hook.z}
            rotation={hook.rotation}
            product={hook.product}
            productCatalog={productCatalog}
          />
        ))}
      </Canvas>
    </div>
  );
}
