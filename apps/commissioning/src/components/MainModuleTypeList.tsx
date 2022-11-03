import { useIntl } from 'react-intl';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type MainModule = {
  id: number;
  name: string;
  manufacturerName: string;
  wattpeak: number;
  onClick: (id: number) => void;
};

export type MainModuleTypeListProps = {
  modules: MainModule[];
};

export function MainModuleTypeList({ modules }: MainModuleTypeListProps) {
  const intl = useIntl();

  return (
    <List>
      {modules.map(({ id, name, manufacturerName, wattpeak, onClick }) => (
        <ListItem key={id}>
          <button
            className="flex cursor-pointer gap-5"
            onClick={() => onClick(id)}
            type="button"
          >
            <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-green-300">
              <SvgIcon name="SolarPanel" className="w-6 text-white" />
            </div>
            <div>
              <Typography weight="medium" className="text-left">
                {manufacturerName} {name}
              </Typography>
              <Typography variant="label" className="text-left">
                {intl.formatMessage({ defaultMessage: 'Wattpeak' })}: {wattpeak}{' '}
                {intl.formatMessage({ defaultMessage: 'Wp' })}
              </Typography>
            </div>
          </button>
        </ListItem>
      ))}
    </List>
  );
}
