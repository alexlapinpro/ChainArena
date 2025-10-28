package services

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/zksync-sdk/zksync2-go/accounts"
	"github.com/zksync-sdk/zksync2-go/clients"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

type Artifact struct {
	Bytecode string          `json:"bytecode"`
	ABI      json.RawMessage `json:"abi"`
}

func GetArtifactData(artifactPath string) (
	bytecodeStr string,
	bytecodeBytes []byte,
	abiJSON []byte,
	err error,
) {
	// 1. Прочтение содержимого JSON-файла
	jsonFile, err := os.Open(artifactPath)
	if err != nil {
		return "", nil, nil, fmt.Errorf("ошибка при открытии файла %s: %w", artifactPath, err)
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return "", nil, nil, fmt.Errorf("ошибка при чтении файла %s: %w", artifactPath, err)
	}

	// 2. Распарсивание JSON-содержимого
	var artifact Artifact
	err = json.Unmarshal(byteValue, &artifact)
	if err != nil {
		return "", nil, nil, fmt.Errorf("ошибка при парсинге JSON из файла %s: %w", artifactPath, err)
	}

	// 3. Извлечение и обработка Bytecode

	bytecodeStr = artifact.Bytecode
	// Удаляем префикс "0x", если он есть, для корректного декодирования
	bytecodeForDecoding := strings.TrimPrefix(bytecodeStr, "0x")

	// Декодируем HEX-строку в срез байтов
	bytecodeBytes, err = hex.DecodeString(bytecodeForDecoding)
	if err != nil {
		return "", nil, nil, fmt.Errorf("ошибка при декодировании HEX-строки байткода: %w", err)
	}

	// Возвращаем строку с префиксом "0x"
	bytecodeStr = "0x" + bytecodeForDecoding

	// 4. Извлечение ABI
	abiJSON = artifact.ABI

	return bytecodeStr, bytecodeBytes, abiJSON, nil
}

func TestDeploy() {
	ZkSyncEraProvider := "https://zkrpc-sepolia.xsollazk.com" // Updated to Xsolla ZK testnet

	client, err := clients.Dial(ZkSyncEraProvider)
	if err != nil {
		log.Panic(err)
	}
	defer client.Close()

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		log.Panic(err)
	}
	fmt.Println("Chain ID: ", chainID)

}

func TournamentDeploy(path string) {
	var (
		PrivateKey        = os.Getenv("PRIVATE_KEY")
		ZkSyncEraProvider = "https://zkrpc-sepolia.xsollazk.com" // Updated to Xsolla ZK testnet
	)
	
	if PrivateKey == "" {
		log.Printf("Warning: No PRIVATE_KEY set for contract deployment")
		return
	}

	fmt.Println(PrivateKey)
	// Connect to ZKsync network
	client, err := clients.Dial(ZkSyncEraProvider)
	if err != nil {
		log.Panic(err)
	}
	defer client.Close()

	if err != nil {
		log.Panic(err)
	}

	// Create wallet
	wallet, err := accounts.NewWallet(common.Hex2Bytes(PrivateKey), client, nil)
	if err != nil {
		log.Panic(err)
	}

	// Read smart contract bytecode
	_, bytecode, _, err := GetArtifactData(path)

	if err != nil {
		log.Panic(err)
	}

	//Deploy smart contract
	hash, err := wallet.DeployWithCreate(nil, accounts.CreateTransaction{
		Bytecode: bytecode,
	})

	fmt.Println("Transaction: ", hash)

	// Wait unit transaction is finalized
	receipt, err := client.WaitMined(context.Background(), hash)
	if err != nil {
		log.Panic(err)
	}

	contractAddress := receipt.ContractAddress
	fmt.Println("Smart contract address", contractAddress.String())

}
