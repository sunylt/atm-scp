# atm-scp
通过scp命令上传指定文件夹到远程地址<br>
```javascript
npm instal atm-scp --save
```
```javascript
/**
 * 功能需求:
 * 上传指定文件夹到远程
 *
 * 细节需求:
 * 1.可以指定无需上传的文件/文件夹
 * 2.对于文件内容相同的文件不得进行覆盖
 * 3.上传期间锁定目录,防止多人操作冲突
 * 4.可以指定线程数量
 * 5.兼容mac,win系统
 *
 * 对应实现思路:
 * 1.https://github.com/isaacs/node-glob
 * 2.例如上传目录下有个文件的内容为content
 * 那么每次上传之后,根据该文件的内容,生成一个唯一的标识：md5(content)+sha1(content) [ps: md5和sha1是加密算法]
 * 每次上传之后都把所有文件的标识存入一个文件(暂且叫地图文件)里面
 * 在上传之前先把地图文件下载到本地,然后与本地的文件的标识做比较,找出内容有变化的文件进行上传
 * 3.上传开始时在远程地址下创建一个文件锁,在程序开始时检测远程地址是否有文件锁
 * 4.暂时略过,作为后续优化项
 * 5.对于win32系统来说,主要问题是路径里面的反斜线(\)需要替换成正斜线(/)
 *
 * module.exports = function(opts){}
 * opts:
 * {
 *  src: '',                    // 要上传的文件夹的绝对路径 eg from: /local/path/to/test
 *  dest: '',                   // 上传到的远程绝对路径        to:  /remote/path/to/test
 *  exclusions: [],             // 需要排除的文件规则,默认从src目录开始匹配
 *  excludeOptions: {           // 参考glob模块的options配置参数
 *      cwd: src,
 *      root: src
 *  },
 *  folder: '__atm__',          // 文件锁和地图文件所在远程服务器文件夹名称,默认为 __atm__
 *  force: false,               // 是否在远程目录锁定时强制上传
 *  auth: {                     // 上传配置,参照scp2模块
 *      host: '',
 *      username: '',
 *      password: ''
 *  },
 *  interval: 1000*3600*24*15      //创建时间超过15天的临时目录可以删除,主要防止runtime文件夹下无用的文件夹太多,一般不用设置该参数
 * }
 *
 * 用法
 * var deploy = require('atm-scp');
 * deploy(opts);
 *
 * 开发相关
 * https://github.com/spmjs/node-scp2
 * https://github.com/isaacs/node-glob
 * https://github.com/jprichardson/node-fs-extra
 *
 * https://github.com/lodash/lodash
 *
 */
```