# -*- coding:utf-8 -*-
from apscheduler.schedulers.blocking import BlockingScheduler
import fm
from git import Repo
import time
def add_line():
    a = fm.load_file('.gitignore')
    a.append('wch is fxxking hot')
    fm.save_file('.gitignore',a)

def delete_line():
    a = fm.load_file('.gitignore')
    a = a[:-1]
    fm.save_file('.gitignore', a)

def git_work():
    repo = Repo('.')
    remote = repo.remote()
    index = repo.index
    index.add(['.gitignore'])
    index.commit('auto commit ;)')
    try:
        remote.pull()
        remote.push()
        print('pushed to master at',time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    except Exception as e:
        print(e)

def auto_commit():
    add_line()
    git_work()
    delete_line()
    git_work()

def main():
    scheduler = BlockingScheduler()
    scheduler.add_job(auto_commit,'cron', hour=23, minute=26)

    try:
        scheduler.start()
    except(KeyboardInterrupt,SystemExit):
        print('aps quit')


if __name__ == '__main__':
    main()
