/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type Project = {
  id: number;
  name: string;
  street: string;
  href: string;
};

export type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <List>
      {projects.map(({ id, name, street, href }) => (
        <ListItem variant="primary" key={id}>
          <Link href={href} legacyBehavior>
            <a className="flex cursor-pointer gap-5">
              <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-green-300">
                <SvgIcon name="Suitcase" className="w-5 text-white" />
              </div>
              <div>
                <Typography weight="medium">{name}</Typography>
                <Typography variant="label">{street}</Typography>
              </div>
            </a>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
