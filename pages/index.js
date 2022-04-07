import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [sourceRarity, setSourceRarity] = useState("common");
  const [sourceGen, setSourceGen] = useState(1);
  const [targetGen, setTargetGen] = useState(6);

  // Gen 1,2,3,4,5 -> [gen6, 7, 8, 9, 10]
  const recruitingCosts = [
    [1600, 1313, 1050, 875, 700],
    [1700, 1400, 1125, 938, 750],
    [1800, 1488, 1200, 1000, 800],
    [1900, 1575, 1275, 1063, 850],
    [2000, 1663, 1350, 1125, 900],
  ];

  // common, uncommon, rare
  const recruitingOdds = {
    common: [0.93, 0.05, 0.03],
    uncommon: [0.15, 0.8, 0.05],
    rare: [0.05, 0.15, 0.8],
  };

  const [aurumValue, setAurumValue] = useState(0.0269);
  const [ethValue, setEthValue] = useState(3197.31);
  // In Eth
  const [commonFloor, setCommonFloor] = useState(0.018);
  const [uncommonFloor, setUncommonFloor] = useState(0.02);
  const [rareFloor, setRareFloor] = useState(0.04);
  //

  const recruitCost = recruitingCosts[sourceGen - 1][targetGen - 6];
  const fiatCost = recruitCost * aurumValue;
  const rarities = recruitingOdds[sourceRarity];
  const commonOdds = recruitingOdds[sourceRarity][0];
  const commonProfit = commonFloor * ethValue - fiatCost;
  const commonExpectedValue = commonOdds * commonProfit;
  console.log("common", commonProfit, commonOdds, commonExpectedValue);
  const uncommonOdds = recruitingOdds[sourceRarity][1];
  const uncommonProfit = uncommonFloor * ethValue - fiatCost;
  const uncommonExpectedValue = uncommonOdds * uncommonProfit;
  console.log("uncommon", uncommonProfit, uncommonOdds, uncommonExpectedValue);
  const rareOdds = recruitingOdds[sourceRarity][2];
  const rareProfit = rareFloor * ethValue - fiatCost;
  const rareExpectedValue = rareOdds * rareProfit;
  console.log("rare", rareProfit, rareOdds, rareExpectedValue);
  console.log(commonExpectedValue + uncommonExpectedValue + rareExpectedValue);

  const PRETTY_PERCENT = Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const PRETTY_CURRENCY = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Recruiting Expected Value</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>CR Recruiting expected value</h1>
        <p>
          {"Gen "}
          <select
            name="sourceGen"
            value={sourceGen}
            onChange={(e) => setSourceGen(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>{" "}
          <select
            name="sourceRarity"
            value={sourceRarity}
            onChange={(e) => setSourceRarity(e.target.value)}
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
          </select>
          {" recruits gen "}
          <select
            name="targetGen"
            value={targetGen}
            onChange={(e) => setTargetGen(e.target.value)}
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </p>
        <p>
          Recruiting Cost in Aurum: {recruitCost}
          <br />
          Recruiting Cost in Fiat: {PRETTY_CURRENCY.format(fiatCost)}
        </p>
        <p>
          OpenSea Common floor (
          <input
            type="text"
            size="5"
            value={commonFloor}
            onChange={(e) => setCommonFloor(e.target.value)}
          />{" "}
          eth ): {PRETTY_CURRENCY.format(commonFloor * ethValue)}
          <br />
          Profit if recruits Common ({PRETTY_PERCENT.format(commonOdds)}):{" "}
          {PRETTY_CURRENCY.format(commonProfit)}
          <br />
          Common Expected Value: {PRETTY_CURRENCY.format(commonExpectedValue)}
        </p>
        <p>
          OpenSea Uncommon floor (
          <input
            type="text"
            size="5"
            value={uncommonFloor}
            onChange={(e) => setUncommonFloor(e.target.value)}
          />{" "}
          eth ): {PRETTY_CURRENCY.format(uncommonFloor * ethValue)}
          <br />
          Profit if recruits Uncommon ({PRETTY_PERCENT.format(
            uncommonOdds
          )}): {PRETTY_CURRENCY.format(uncommonProfit)}
          <br />
          Uncommon Expected Value:{" "}
          {PRETTY_CURRENCY.format(uncommonExpectedValue)}
        </p>
        <p>
          OpenSea Rare floor (
          <input
            type="text"
            size="5"
            value={rareFloor}
            onChange={(e) => setRareFloor(e.target.value)}
          />{" "}
          eth ): {PRETTY_CURRENCY.format(rareFloor * ethValue)}
          <br />
          Profit if recruits Rare ({PRETTY_PERCENT.format(rareOdds)}):{" "}
          {PRETTY_CURRENCY.format(rareProfit)}
          <br />
          Rare Expected Value: {PRETTY_CURRENCY.format(rareExpectedValue)}
        </p>
        <p>
          Total Expected Value:{" "}
          {PRETTY_CURRENCY.format(
            commonExpectedValue + uncommonExpectedValue + rareExpectedValue
          )}
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
