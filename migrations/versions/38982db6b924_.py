"""empty message

Revision ID: 38982db6b924
Revises: 60b7b5094ec4
Create Date: 2024-03-28 16:17:25.336355

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38982db6b924'
down_revision = '60b7b5094ec4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('_alembic_tmp_decks')
    # with op.batch_alter_table('decks', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('preview_image', sa.String(), nullable=False))
    #     batch_op.drop_column('previewImage')

    # ### end Alembic commands ###
  print('no upgrade')


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # with op.batch_alter_table('decks', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('previewImage', sa.VARCHAR(), nullable=False))
    #     batch_op.drop_column('preview_image')

    # op.create_table('_alembic_tmp_decks',
    # sa.Column('id', sa.INTEGER(), nullable=False),
    # sa.Column('preview_image', sa.VARCHAR(), nullable=False),
    # sa.Column('name', sa.VARCHAR(length=50), nullable=False),
    # sa.Column('user_id', sa.INTEGER(), nullable=True),
    # sa.Column('format', sa.VARCHAR(length=50), nullable=False),
    # sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # ### end Alembic commands ###
  print('no downgrade')
