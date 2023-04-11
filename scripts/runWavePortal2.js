const main = async () => {
    const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();
    const waveContract2Factory = await hre.ethers.getContractFactory("WavePortal2");
    const waveContract2 = await waveContract2Factory.deploy();
    await waveContract2.deployed();
  
    console.log("Contract deployed to:", waveContract2.address);
    console.log("Contract deployed by owner:", owner.address);
  
    await waveContract2.getTotalWaves();

    const firstWaveTxn = await waveContract2.wave("hello",{value:123});
    await firstWaveTxn.wait();
  
    await waveContract2.getTotalWaves();

    const secondWaveTxn = await waveContract2.wave("hey",{value:123});
    await secondWaveTxn.wait();

    await waveContract2.getTotalWaves();
    const waves=await waveContract2.getAllWaves();
    console.log(waves);
  
    
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
  };
  
  runMain();
  