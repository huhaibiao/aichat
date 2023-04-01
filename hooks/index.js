//读取 更改package.json,name version 10个为一个版进阶
//控制窗口，询问吗是否发版
//文件操作有可能是异步的

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import pc from "picocolors"
import inquirer from 'inquirer';
const prompt = inquirer.createPromptModule();

/**
 * 获取当前分支名称
 * @param {String} _path 项目路径
 * @returns {String} 分支名
 */
export function getBranch(_path = './') {
    try {
        let branch = execSync('git branch --show-current', {
            cwd: _path,
            encoding: 'utf-8'
        })
        console.log(pc.bgBlue(pc.green(`当前所在的分支:`)), pc.bold(pc.green(`${branch.trim()}`)))
        return branch.trim()
    } catch (error) {
    }

}
// getBranch()


/**控制台面板显示询问确认 */
export const confirmCommit = () => {
    return prompt({
        type: 'confirm',
        name: 'value',
        message: '是否要发版'
    })
        .then((answers) => {
            // Use user feedback for... whatever!!
            return answers.value
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log('🚀 ~ file: index.js:37 ~ confirmCommit ~ error:', error)
                // Prompt couldn't be rendered in the current environment
            } else {
                console.log('🚀 ~ file: index.js:37 ~ confirmCommit ~ error:', error)
                // Something else went wrong
            }
        });
}

// confirmCommit()

/**发版更新package.json */
export const updatePkg = () => {
    const pkgPath = path.resolve('./', 'package.json')
    const pkgJson = fs.readFileSync(pkgPath).toString()
    const pkgObject = JSON.parse(pkgJson)
    const vers = pkgObject.version.split('.')

    const l = vers.length - 1
    vers[l] = parseInt(vers[l]) + 1
    for (let i = l; i > 0; i--) {
        if (vers[i] > 9) {
            vers[i] = 0
            vers[i - 1] = parseInt(vers[i - 1]) + 1
        }
    }

    pkgObject.version = vers.join('.')
    fs.writeFileSync(pkgPath, JSON.stringify(pkgObject, null, 2), function (err) {
        if (err) throw err
    })
    return pkgObject
}

// updatePkg()
