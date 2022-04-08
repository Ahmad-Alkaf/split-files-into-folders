/**
 * subfolder: is the folders that will created, inside a main folder that its path will be provided in config.path
 * Notice: subSize in configuration are proximately after a violate it will stop add files. So, the proximation depends on last file size added into each subfolder.
 */
var KB = 1024;
var MB = 1024 * KB;
var GB = 1024 * MB;
//!RUN TYPESCRIPT FILE BEFORE JAVASCRIPT FILE i.e
//!   tsc index.ts
//!after that:
//!   node index.js
const config: Config = {
   path: `C:\\Users\\Ahmed\\Desktop\\Tests Folder\\test`,//`S:\\VIDEOS\\Bozeman Science`,
   subFiles: 4,
   subSize: 1.5 * GB,  //! Ex:'2 GB' typed as '2 * GB'
   orderBy: 'random',
}

//Do NOT Touch Below
import * as fileSystem from 'fs'
const fs = fileSystem.promises;
async function main() {
   var info = {
      totalFiles: 0,
      totalFolders: 0,
      mainFolderName: config.path.substring(config.path.lastIndexOf('\\') + 1)
   }
   checkValidConfig()
   if (config.path)
      var dir = await fs.opendir(config.path);

   for await (const f of dir) {
      if (f.isDirectory())
         throw new Error(`There is a Directory named: ${f.name}. In the path provided! ${config.path}`);
      info.totalFiles++;
   }
   if (info.totalFiles == 0 || info.totalFiles <= config.subFiles)
      throw new Error(`Total files found '${info.totalFiles}' ${info.totalFiles == 0 ? '' : '. But, you make ' + config.subFiles + ' files limit for each subFolder!'}`)
   var filesNameArr = await fs.readdir(config.path);//arr of files name

   if (config.orderBy == 'random')
      filesNameArr.sort(random).sort(random).sort(random).sort(random).sort(random).sort(random);//wast of power OR very random? :)
   else if (config.orderBy == 'name')
      filesNameArr.sort(AlphaIntSort);
   else if (config.orderBy == 'name desc')
      filesNameArr.sort(AlphaIntSort).reverse();
   // console.table(filesNameArr);
   var allFiles: MyFile[] = await Promise.all(filesNameArr.map(async (f) => { return { name: f, size: (await fs.stat(config.path + '\\' + f)).size } }))

   console.table(allFiles)
   var remainFiles = info.totalFiles;//remained files in main folder. at the end should be 0.
   var subFolderPath: string;
   var i = 0;

   while (remainFiles > 0) {
      subFolderPath = `${config.path}\\${info.mainFolderName} ${++info.totalFolders} of`;//we don't know how many folders will created so we leave after '...of' blank. Then will rename it.
      await fs.mkdir(subFolderPath);

      // i is num of all files, j is num of files in subfolder

      for (let j = 0; await isSubRemind(j, subFolderPath, remainFiles); i++, j++, remainFiles--) {
         await fs.rename(config.path + '\\' + allFiles[i].name, subFolderPath + '\\' + allFiles[i].name);
      }


   }

   //append in name of all subfolders the total num of subfolders after '...of'
   for (let j = 1; j <= info.totalFolders; j++)
      await fs.rename(`${config.path}\\${info.mainFolderName} ${j} of`, `${config.path}\\${info.mainFolderName} ${j} of ${info.totalFolders}`)
   print(info);
}


function print(info): void {
   console.table({
      'In Folder': '.../' + info.mainFolderName,
      'Founded Files': info.totalFiles,
      'Made Folders': info.totalFolders,
   })
}

/**
 * @param  {number} filesInSub
 * @param  {string} subFolderPath
 * @param  {number} remainFiles
 * @returns {boolean} true if subfolder not filled or any config options have not violated. false otherwise.
 */
function isSubRemind(filesInSub: number, subFolderPath: string, remainFiles: number): Promise<boolean> {
   return new Promise(async (resolve, reject) => {
      try {
         if (remainFiles <= 0) return resolve(false);

         if (config.subFiles != 0)
            if (filesInSub >= config.subFiles)
               return resolve(false);

         if (config.subSize != 0) {
            var subSize = await dirSize(subFolderPath);
            if (subSize >= config.subSize)
               return resolve(false);
         }
         return resolve(true);
      } catch (e) {
         throw new Error('Throws from isSubRemind() function' + e);
      }
   })
}

/**
 * 
 * @param path path of the folder
 * @returns {Promise<number>} of total size of the folder.
 */
function dirSize(path: string): Promise<number> {
   return new Promise(async (resolve, reject) => {
      try {
         const dir = await fs.readdir(path);
         var size = 0;
         for (let i = 0; i < dir.length; i++)
            size += (await fs.stat(path + '\\' + dir[i])).size;
         return resolve(size)
      } catch (e) {
         throw new Error('Throws from dirSize() function' + e)
      }
   })
}


/**
 * used as parameter on build-in sort function for arrays
 */
function AlphaIntSort(a: string, b: string) {
   a = a.substring(0, a.lastIndexOf('.'));
   b = b.substring(0, b.lastIndexOf('.'));

   if (a.match(/(\d+)/g) && b.match(/(\d+)/g))
      if (a.substring(0, a.indexOf(a.match(/(\d+)/g)[0])) == b.substring(0, b.indexOf(b.match(/(\d+)/g)[0])))
         return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
   return a.toLowerCase() > b.toLowerCase() ? 1 : (a.toLowerCase() < b.toLowerCase()) ? -1 : 0;
}
/**
 * used as parameter on build-in sort function for arrays
 */
function random(a, b) {
   return 0.5 - Math.random()
}

/**
 * check if there is Invalid configuration entered!
 */
function checkValidConfig() {
   var e = 'Invalid Configuration!'
   if (config.subFiles < 0)
      throw new Error(e + ' subFiles should be 0 or bigger.')
   if (config.subSize < 0)
      throw new Error(e + ' subSize should be 0 or bigger.')
   if (config.subSize == 0 && config.subFiles == 0)
      throw new Error(e + ' There should be at least one limitation to stop adding files into subfolder. Found none.')
}



interface Config {
   /**
  * the path of folder that have many files to be divided.
  */
   path: string
   /**
    * number of files limit in each subfolder. 0 == unlimited. First limit reached will apply.
    */
   subFiles: number
   /**
   * limit size of each subfolder. In Bytes. 0 == unlimited. First limit reached will apply.
   */
   subSize: number,
   /**
    * How each subfolder will filled base on 'name' | 'name desc' | 'random'.
    */
   orderBy: OrderBy
}
type OrderBy = 'name' | 'name desc' | 'random';
interface MyFile {
   name: string
   path?: string
   size: number
   index?: number
}



async function test() {

   // if (a.match(/[0-9]/) && b.match(/[0-9]/))
   //    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
   // var arr=['ab','a','q','w','E','r','t','y','u','i','o','p','A','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','10','2','99','9','a9','a10',]
   console.log('main() executed')
}


/**
 * make two files as cache files 1-cacheTs.txt 2-cacheJs.txt
 * 1- will save typescript file txt 2- js
 * to prevent saving all files as txt we can hash them to save just 256-bit if file change then hash will change. So, same functionality but less space
 * if all files not found return true and make those files by copy 1-index.ts and 2-index.js
 * if all files exist then:
 *    if cacheTs don't equal to index.ts and cacheJs equal to index.js then user doesn't compile TS return false;
 *    if cacheTs don't equal to index.ts and cacheJs don't equal to index.js then user compile TS save them and return true;
 *    To prevent malicious usage else return false with unknown error;
 * @returns {Boolean|string} string for message error boolean for true.
 */
import * as crypto from 'crypto'
async function isTypescriptCompiled(): Promise<string | boolean> {
   var indexTs: string = await fs.readFile('./index.ts', 'utf8');
   var indexJs: string = await fs.readFile('./index.js', 'utf8');
   var cacheTs: string;
   var cacheJs: string;
   try {
      cacheTs = await fs.readFile('./cacheTs.txt', 'utf8');
      cacheJs = await fs.readFile('./cacheJs.txt', 'utf8');
   } catch (e) {
      cacheTs = null;
      cacheJs = null;
   }
   indexTs = crypto
      .createHash('sha256')
      .update(indexTs)
      .digest("hex");//'base64' | 'hex';
   indexJs = crypto
      .createHash('sha256')
      .update(indexJs)
      .digest("hex");//'base64' | 'hex';

   if (cacheJs === null && cacheTs === null)
      return true;
   if (typeof cacheJs === 'string' && typeof cacheTs === 'string' &&
      (cacheTs !== indexTs && cacheJs === indexJs)) {
      return false;
   } else {
      await fs.writeFile('./cacheTs.txt', indexTs);
      await fs.writeFile('./cacheJs.txt', indexJs);
      return true;
   }
      // if (cacheTs === indexTs && cacheJs === indexJs ||
      //    (cacheTs !== indexTs && cacheJs !== indexJs)) 
      //    return true;
   // return 'Unknown Error when checking if file compiled.';
}
/**
 * wrapper that execute main(), to get rid of try catch
 */
const wrapper = (async () => {
   try {
      console.time('process Time');
      let compiled: string | boolean = await isTypescriptCompiled();
      if (typeof compiled !== 'boolean' || compiled === false)
         throw new Error(`Compile TypeScript File Before Run JavaScript! ${compiled || ''}`)
      false ?
         await main() :
         await test();
      console.timeEnd('process Time');
   } catch (e) {
      console.timeEnd('process Time');
      console.log(/*'wrapper catch',*/ e)
   }
})
wrapper()


