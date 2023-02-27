import styles from './styles.module.scss';
import { menuArray } from '../../../data/home';
import Link from 'next/link';
//-------
import { FaMemory } from 'react-icons/fa';
import { GiCarDoor, GiProcessor } from 'react-icons/gi';
import { MdDeveloperBoard } from 'react-icons/md';
import { BiHeadphone, BiCategory } from 'react-icons/bi';
import { BsLaptop } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';
import { GoCircuitBoard } from 'react-icons/go';
import { GrNetworkDrive, GrCloudComputer, GrStorage } from 'react-icons/gr';
import { HiServer } from 'react-icons/hi';
//-------
export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item, i) => (
            <li>
              <Link href={item.link} legacyBehavior>
                <a>
                  {i == 0 ? (
                    <BiHeadphone />
                  ) : i == 1 ? (
                    <GiCarDoor />
                  ) : i == 2 ? (
                    <BsLaptop />
                  ) : i == 3 ? (
                    <FaMemory />
                  ) : i == 4 ? (
                    <FiMonitor />
                  ) : i == 5 ? (
                    <MdDeveloperBoard />
                  ) : i == 6 ? (
                    <GoCircuitBoard />
                  ) : i == 7 ? (
                    <GrNetworkDrive />
                  ) : i == 8 ? (
                    <GrCloudComputer />
                  ) : i == 9 ? (
                    <GiProcessor />
                  ) : i == 10 ? (
                    <HiServer />
                  ) : i == 11 ? (
                    <GrStorage />
                  ) : (
                    ''
                  )}
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
