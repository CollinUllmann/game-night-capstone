"""empty message

Revision ID: ba310e61c84d
Revises: e193e59ba453
Create Date: 2024-03-28 15:42:42.188783

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba310e61c84d'
down_revision = 'e193e59ba453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('decks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('previewImage', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('decks', schema=None) as batch_op:
        batch_op.drop_column('previewImage')

    # ### end Alembic commands ###