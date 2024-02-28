"""empty message

Revision ID: cfa149174a51
Revises: 5a31ef48fed0
Create Date: 2024-02-28 16:23:42.081705

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfa149174a51'
down_revision = '5a31ef48fed0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.drop_column('oracle_text')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('oracle_text', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
